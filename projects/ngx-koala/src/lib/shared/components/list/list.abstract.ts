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
import { ListFormFilterInterface } from './list.form-filter.interface';

@Directive()
export abstract class ListAbstract extends FormAbstract implements AfterViewInit {
  public selection = new SelectionModel<object>(true, []);
  public limitOptions: number[] = [10, 20, 30, 50, 100];
  public showMenuList: boolean = false;
  public allSelected = false;
  public qtdListResult = 0;
  public dataSource = new MatTableDataSource<any>([]);
  public typeRequest: 'all' | 'onDemand' = 'onDemand';
  @Input() filterParams = new BehaviorSubject<ListFormFilterInterface>(null);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  protected constructor(
    private requestFunction: () => Observable<any>,
    private requestResponseFunction: <T>(results: T[]) => void,
    private requestErrorFunction: () => any,
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
      if (this.sort) {
        this.prepareSearch();
      } else if (tentativas > 10) {
        this.requestErrorFunction();
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
      sort: this.sort.active,
      order: this.sort.direction,
      page: this.paginator.pageIndex
    });
  }

  private prepareSearch() {
    if (this.typeRequest === 'onDemand') {
      this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

      merge(this.sort.sortChange, this.paginator.page, this.filterParams).pipe(
        startWith({}),
        debounceTime(300),
        switchMap(this.requestFunction),
        map((response) => {
          this.loading(false);
          return this.requestResponseFunction(response);
        }),
        catchError(this.requestErrorFunction)
      ).subscribe();
    } else {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.filterParams.pipe(
        startWith({}),
        debounceTime(300),
        switchMap(this.requestFunction),
        map((response) => {
          this.loading(false);
          return this.requestResponseFunction(response);
        }),
        catchError(this.requestErrorFunction)
      ).subscribe();
    }
  }

  private isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;

    return this.defineStatusSelectAll(numSelected === numRows);
  }
}