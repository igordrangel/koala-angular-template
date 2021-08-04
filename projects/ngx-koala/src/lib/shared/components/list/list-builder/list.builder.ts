import { KoalaListConfigInterface } from "../koala.list-config.interface";
import { KoalaListItemInterface } from "../koala-list-item.interface";
import { Type } from "@angular/core";
import { KoalaDynamicComponent } from "../../dynamic-component/koala-dynamic-component";
import { KoalaListFilterInterface } from "../koala-list-filter.interface";
import { BehaviorSubject, Observable } from "rxjs";
import { KoalaListFormFilterInterface } from "../koala-list-form-filter.interface";
import { KoalaListItemMenuOptionInterface } from "../koala-list-item-menu-option.interface";
import { SelectionModel } from "@angular/cdk/collections";
import { KoalaListPageSize } from "../list.abstract";
import { first } from "rxjs/operators";

export class ListBuilder<DataType> {
  private config = {} as KoalaListConfigInterface;

  public service(
    service: (filter: BehaviorSubject<KoalaListFormFilterInterface>) => Observable<any> | Promise<any>,
    type: 'all' | 'onDemand' = "all",
    resultIndexName?: string,
    qtdResultIndexName?: string
  ) {
    this.config.typeRequest = type;
    this.config.responseIndexName = resultIndexName;
    this.config.responseQtdResultIndexName = response => response[qtdResultIndexName];
    this.config.columnSort = this.config?.filterParams?.getValue()?.sort ?? null;
    this.config.sortDirection = this.config?.filterParams?.getValue()?.order ?? 'asc';

    const response = service(this.config?.filterParams);

    if (response instanceof Promise) {
      this.config.request = new Observable<any>(observe => {
        response.then(response => observe.next(response))
                .catch(error => observe.error(error));
      }).pipe(first());
    } else {
      this.config.request = new Observable<any>(observe => {
        (service(this.config?.filterParams) as Observable<any>).pipe(first()).subscribe(observe);
      }).pipe(first());
    }

    return this;
  }

  public filterConfig(config: KoalaListFilterInterface) {
    this.config.filterFormConfig = config;
    return this;
  }

  public defaultFilter(config: KoalaListFormFilterInterface) {
    this.config.filterParams = new BehaviorSubject<KoalaListFormFilterInterface>(config);
    return this;
  }

  public pageSize(size: KoalaListPageSize) {
    this.config.pageSize = size;
    return this;
  }

  public columns(columns: string[]) {
    this.config.columnsToShowInList = columns;
    return this;
  }

  public itemColumn(item: KoalaListItemInterface<DataType>) {
    (this.config.itemsList?.length > 0) ?
      this.config.itemsList.push(item) :
      this.config.itemsList = [item];

    return this;
  }

  public actionList(item: KoalaListItemMenuOptionInterface<DataType>) {
    (this.config.itemsMenuListOptions?.length > 0) ?
      this.config.itemsMenuListOptions.push(item) :
      this.config.itemsMenuListOptions = [item];

    return this;
  }

  public getDataSource(fn: (dataSource: DataType[]) => void) {
    this.config.getDataSource = fn;
    return this;
  }

  public getSelectionList(fn: (selection: SelectionModel<DataType>) => void) {
    this.config.getSelectionList = fn;
    return this;
  }

  public emptyListComponent(component: Type<any>, data?: any) {
    this.config.emptyListComponent = new KoalaDynamicComponent(component, data);
    return this;
  }

  public disableCheckboxItemList(fn: (item: DataType) => boolean) {
    this.config.disabledCheckboxItemList = fn;
    return this;
  }

  public getConfig(): KoalaListConfigInterface {
    this.config.reload = new BehaviorSubject<boolean>(false);
    return this.config;
  }
}
