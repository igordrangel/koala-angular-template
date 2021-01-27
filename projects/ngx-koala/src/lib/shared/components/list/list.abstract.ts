import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Directive, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { FormAbstract } from '../../../core/form.abstract';
import { FormGroup } from '@angular/forms';
import { KoalaDelayHelper } from 'tskoala-helpers/dist/delay/koala-delay.helper';
import { catchError, debounceTime, map, startWith, switchMap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { KoalaListFormFilterInterface } from './koala-list-form-filter.interface';
import {KoalaDynamicComponent} from "../dynamic-component/koala-dynamic-component";
import { KlDelay } from "koala-utils/dist/utils/KlDelay";
import { KoalaListConfigInterface } from "./koala.list-config.interface";

@Directive()
export abstract class ListAbstract extends FormAbstract implements AfterViewInit {
  public selection = new SelectionModel<object>(true, []);
  public limitOptions: number[] = [10, 20, 30, 50, 100];
  public showMenuList: boolean = false;
  public allSelected = false;
  public dataSource = new MatTableDataSource<any>([]);
  public typeRequest: 'all' | 'onDemand' = 'onDemand';
  public filterParams = new BehaviorSubject<KoalaListFormFilterInterface>(null);
  public emptyListComponent?: KoalaDynamicComponent;

  @Input() config: KoalaListConfigInterface;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  protected constructor(
    private requestFunction: () => Observable<any>,
    private requestResponseFunction: <T>(results: T[]) => void,
    formSearch: () => FormGroup
  ) {
    super(formSearch);
  }

  async ngAfterViewInit() {
    let tentativas = 0;
    let stop = false;
    do {
      tentativas++;
      await KoalaDelayHelper.waitFor(400);
      if (this.sort || this.emptyListComponent) {
        this.prepareSearch().then();
        if (this.emptyListComponent) stop = true;
      } else if (tentativas > 10) {
        stop = true;
      }
    } while (!this.sort && !stop);
  }

  public selectAll() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(item => this.selection.select(item));

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

  private async prepareSearch() {
    if (this.typeRequest === 'onDemand') {
      merge(this.sort?.sortChange ?? new Observable(null), this.paginator.page, this.filterParams).pipe(
        startWith({}),
        switchMap(() => new Observable(observe => {
          this.loading(true);
          this.selection.clear();
          if (this.filterParams.value) {
            this.filterParams.value.sort = this.sort?.active ?? '';
            this.filterParams.value.order = this.sort?.direction ?? 'asc';
            this.filterParams.value.page = this.paginator.pageIndex;
            this.filterParams.value.limit = this.paginator.pageSize;
          }
          observe.next(true);
        })),
        debounceTime(300),
        switchMap(this.requestFunction),
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
    const numRows = this.dataSource.data.length;

    return this.defineStatusSelectAll(numSelected === numRows);
  }
}
