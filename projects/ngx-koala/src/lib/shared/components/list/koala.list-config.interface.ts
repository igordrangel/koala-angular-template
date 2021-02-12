import { SelectionModel } from "@angular/cdk/collections";
import { KoalaListItemMenuOptionInterface } from "./koala-list-item-menu-option.interface";
import { KoalaListItemInterface } from "./koala-list-item.interface";
import { BehaviorSubject, Observable } from "rxjs";
import { KoalaListFilterInterface } from "./koalaListFilterInterface";
import { FormGroup } from "@angular/forms";
import { KoalaListFormFilterInterface } from "./koala-list-form-filter.interface";
import { KoalaDynamicComponent } from "../dynamic-component/koala-dynamic-component";
import { KoalaListPageSize } from "./list.abstract";

export interface KoalaListConfigInterface {
  columnsToShowInList: string[];
  columnSort?: string;
  itemsMenuListOptions?: KoalaListItemMenuOptionInterface[];
  itemsList: KoalaListItemInterface[];
  request: Observable<any>;
  responseIndexName: string;
  responseQtdResultIndexName: (response: any) => number;
  typeRequest?: 'all' | 'onDemand';
  filterFormConfig: KoalaListFilterInterface;
  reload: BehaviorSubject<boolean>;
  formSearch: FormGroup;
  formAdvancedSearch: FormGroup;
  showAdvancedFilter: boolean;
  filterParams?: BehaviorSubject<KoalaListFormFilterInterface>;
  emptyListComponent?: KoalaDynamicComponent;
  qtdListResult?: number;
  getSelectionList: (selection: SelectionModel<any>) => void;
  getDataSource: (dataSource: any[]) => void;
  pageSize?: KoalaListPageSize;
}
