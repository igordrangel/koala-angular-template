import { KoalaListConfigInterface } from "../../../../../../ngx-koala/src/lib/shared/components/list/koala.list-config.interface";
import { KoalaListItemInterface } from "../../../../../../ngx-koala/src/lib/shared/components/list/koala-list-item.interface";
import { Type } from "@angular/core";
import { KoalaDynamicComponent } from "../../../../../../ngx-koala/src/lib/shared/components/dynamic-component/koala-dynamic-component";
import { KoalaListFilterInterface } from "../../../../../../ngx-koala/src/lib/shared/components/list/koalaListFilterInterface";
import { BehaviorSubject, Observable } from "rxjs";
import { KoalaListFormFilterInterface } from "../../../../../../ngx-koala/src/lib/shared/components/list/koala-list-form-filter.interface";
import { KoalaListItemMenuOptionInterface } from "../../../../../../ngx-koala/src/lib/shared/components/list/koala-list-item-menu-option.interface";
import { SelectionModel } from "@angular/cdk/collections";

export class ListBuilder<DataType> {
  private config = {} as KoalaListConfigInterface;

  public service(service: Observable<any> | Promise<any>) {
    if (service instanceof Promise) {
      this.config.request = new Observable<any>(observe => {
        service.then(response => observe.next(response))
               .catch(error => observe.error(error));
      });
    } else {
      this.config.request = service
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

  public emptyListComponent(component: Type<any>) {
    this.config.emptyListComponent = new KoalaDynamicComponent(component);
    return this;
  }

  public getConfig(): KoalaListConfigInterface {
    this.config.reload = new BehaviorSubject<boolean>(false);
    return this.config;
  }
}
