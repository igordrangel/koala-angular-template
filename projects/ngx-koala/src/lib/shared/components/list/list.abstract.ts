import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, EventEmitter, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, Observable } from 'rxjs';
import { FormAbstract } from '../../../core/form.abstract';
import { FormGroup } from '@angular/forms';
import { KoalaDelayHelper } from 'tskoala-helpers/dist/delay/koala-delay.helper';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';

export abstract class ListAbstract extends FormAbstract implements AfterViewInit {
  public selection = new SelectionModel<object>(true, []);
  public limitOptions: number[] = [10, 20, 30, 50, 100];
  public showMenuList: boolean = false;
  public allSelected = false;
  public qtdListResult = 0;
  public dataSource = new MatTableDataSource<any>([]);
  public typeRequest: 'all' | 'onDemand' = 'onDemand';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  private searchEmmiter = new EventEmitter<boolean>(null);

  protected constructor(
    private requestFunction: () => Observable<any> | Promise<any>,
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

  private prepareSearch() {
    if (this.typeRequest === 'onDemand') {
      this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

      merge(this.sort.sortChange, this.paginator.page).pipe(
        startWith({}),
        switchMap(this.search()),
        map((response) => {
          this.loading(false);
          return this.requestResponseFunction(response);
        }),
        catchError(this.requestErrorFunction)
      ).subscribe();
    } else {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.searchEmmiter.pipe(
        startWith({}),
        switchMap(this.search()),
        map((response) => {
          this.loading(false);
          return this.requestResponseFunction(response);
        }),
        catchError(this.requestErrorFunction)
      ).subscribe();
    }
  }

  private search() {
    this.loading(true);
    this.selection.clear();
    if (this.paginator) {
      this.paginator.firstPage();
    }

    return this.requestFunction;
  }

  private isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;

    return this.defineStatusSelectAll(numSelected === numRows);
  }
}
