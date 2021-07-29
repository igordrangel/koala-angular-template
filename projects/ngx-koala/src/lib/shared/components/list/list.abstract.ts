import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BehaviorSubject, merge, Observable, Subscription } from 'rxjs';
import { FormAbstract } from '../../../core/form.abstract';
import { FormGroup } from '@angular/forms';
import { catchError, debounceTime, map, startWith, switchMap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { KoalaListFormFilterInterface } from './koala-list-form-filter.interface';
import { KoalaDynamicComponent } from "../dynamic-component/koala-dynamic-component";
import { KlDelay } from "koala-utils/dist/utils/KlDelay";
import { KoalaListConfigInterface } from "./koala.list-config.interface";

export type KoalaListPageSize = 10 | 20 | 30 | 50 | 100;

export abstract class ListAbstract extends FormAbstract {
  public selection = new SelectionModel<object>(true, []);
  public limitOptions: number[] = [10, 20, 30, 50, 100];
  public showMenuList: boolean = false;
  public allSelected = false;
  public dataSource = new MatTableDataSource<any>([]);
  public typeRequest: 'all' | 'onDemand' = 'onDemand';
  public filterParams = new BehaviorSubject<KoalaListFormFilterInterface>(null);
  public emptyListComponent?: KoalaDynamicComponent;
  public pageSize: KoalaListPageSize;

  protected config: KoalaListConfigInterface;
  protected paginator: MatPaginator;
  protected sort: MatSort;

  private subscriptionSortList: Subscription;
  private intervalSortList: any;

  protected constructor(
    private requestFunction: () => Observable<any>,
    private requestResponseFunction: <T>(results: T[]) => void,
    formSearch: () => FormGroup
  ) {
    super(formSearch);
  }

  public selectAll() {
    this.isAllSelected() ?
    this.selection.clear() :
    this.dataSource.data.forEach(item => {
      if (
        (this.config.disabledCheckboxItemList && !this.config.disabledCheckboxItemList(item)) ||
        !this.config.disabledCheckboxItemList
      ) {
        this.selection.select(item);
      }
    });

    this.isAllSelected();
  }

  public defineStatusSelectAll(status: boolean) {
    this.allSelected = status;
    return this.allSelected;
  }

  public selectItem() {
    setTimeout(() => {
      this.showMenuList = this.selection.hasValue();
      this.isAllSelected();
    }, 50);
  }

  public async search(filter?: any) {
    this.loading(true);
    this.selection.clear();
    if (this.paginator) {
      this.paginator.firstPage();
    }
    this.filterParams.next({
      params: filter,
      sort: this.sort?.active ?? '',
      order: this.sort?.direction ?? 'asc',
      page: this.paginator?.pageIndex ?? 1,
      limit: this.paginator?.pageSize ?? 30
    });
  }

  protected onDestroy() {
    this.subscriptionSortList?.unsubscribe();
    clearInterval(this.intervalSortList);
  }

  protected async afterViewInit() {
    let tentativas = 0;
    let stop = false;
    do {
      tentativas++;
      await KlDelay.waitFor(400);
      if (this.sort || this.emptyListComponent) {
        this.prepareSearch().then();
        if (this.emptyListComponent) stop = true;
      } else if (tentativas > 10) {
        stop = true;
      }
    } while (!this.sort && !stop);
  }

  private async prepareSearch() {
    if (this.typeRequest === 'onDemand') {

      this.intervalSortList = setInterval(() => {
        if (this.sort && !this.subscriptionSortList) {
          this.subscriptionSortList = this.sort.sortChange.subscribe(() => {
            const filter = this.filterParams.value;
            filter.sort = this.sort.active;
            filter.order = this.sort.direction;
            this.filterParams.next(filter);
          });
        } else if (!this.sort && this.subscriptionSortList) {
          this.subscriptionSortList.unsubscribe();
        }
      }, 50);

      merge(this.paginator.page, this.filterParams).pipe(
        startWith({}),
        switchMap(() => new Observable(observe => {
          this.loading(true);
          this.selection.clear();
          if (this.filterParams.value) {
            this.filterParams.value.sort = this.sort?.active ?? this.config.columnSort;
            this.filterParams.value.order = this.sort?.direction ?? this.config.sortDirection;
            this.filterParams.value.page = this.paginator.pageIndex;
            this.filterParams.value.limit = this.paginator.pageSize;
          }
          observe.next(true);
        })),
        debounceTime(300),
        switchMap(this.requestFunction),
        catchError(() => new Observable(observe => {
          this.loading(false);
          observe.next(true);
        })),
        map((response) => {
          this.loading(false);
          return this.requestResponseFunction(response);
        })
      ).subscribe();
    } else {
      this.dataSource.paginator = this.paginator;
      this.filterParams.pipe(
        startWith({}),
        debounceTime(300),
        switchMap(this.requestFunction),
        catchError(() => new Observable(observe => {
          this.loading(false);
          observe.next(true);
        })),
        map((response) => {
          this.loading(false);
          return this.requestResponseFunction(response);
        })
      ).subscribe();
    }

    if (this.emptyListComponent) {
      do {
        await KlDelay.waitFor(301);
        if (this.sort) {
          if (this.typeRequest === "onDemand") {
            this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
          } else {
            this.dataSource.sort = this.sort;
          }
        }
      } while (!this.sort);
    }
  }

  private isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = (this.config.disabledCheckboxItemList ?
                     this.dataSource.data.filter(item => !this.config.disabledCheckboxItemList(item)) :
                     this.dataSource.data).length;

    return this.defineStatusSelectAll(numSelected === numRows);
  }
}
