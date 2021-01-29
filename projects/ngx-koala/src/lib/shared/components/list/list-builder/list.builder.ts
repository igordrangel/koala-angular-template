import { KoalaListConfigInterface } from "../koala.list-config.interface";
import { KoalaListItemInterface } from "../koala-list-item.interface";
import { Type } from "@angular/core";
import { KoalaDynamicComponent } from "../../dynamic-component/koala-dynamic-component";
import { KoalaListFilterInterface } from "../koalaListFilterInterface";
import { BehaviorSubject, Observable } from "rxjs";
import { KoalaListFormFilterInterface } from "../koala-list-form-filter.interface";
import { KoalaListItemMenuOptionInterface } from "../koala-list-item-menu-option.interface";
import { SelectionModel } from "@angular/cdk/collections";

export class ListBuilder<DataType> {
  private config = {} as KoalaListConfigInterface;

  public service(
    service: (filter: KoalaListFormFilterInterface) => Observable<any> | Promise<any>,
    type: 'all' | 'onDemand' = "all",
    resultIndexName?: string,
    qtdResultIndexName?: string
  ) {
    this.config.typeRequest = type;
    this.config.responseQtdResultIndexName = response => response[qtdResultIndexName];

    const response = service(this.config?.filterParams?.getValue());

    if (response instanceof Promise) {
      this.config.request = new Observable<any>(observe => {
        response.then(response => observe.next(response[resultIndexName]))
                .catch(error => observe.error(error));
      });
    } else {
      this.config.request = new Observable<any>(observe => {
        response.subscribe(
          result => observe.next(result[resultIndexName]),
          error => observe.error(error)
        );
      });
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

  public columns(columns: string[]) {
    this.config.columnsToShowInList = columns;
    return this;
  }

  public itemColumn(item: KoalaListItemInterface) {
    (this.config.itemsList?.length > 0) ?
      this.config.itemsList.push(item) :
      this.config.itemsList = [item];

    return this;
  }

  public actionList(item: KoalaListItemMenuOptionInterface) {
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

  public getConfig(): KoalaListConfigInterface {
    this.config.reload = new BehaviorSubject<boolean>(false);
    return this.config;
  }
}
