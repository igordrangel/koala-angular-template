import { SelectionModel } from "@angular/cdk/collections";
import { KoalaListItemMenuOptionInterface } from "./koala-list-item-menu-option.interface";
import { KoalaListItemInterface } from "./koala-list-item.interface";
import { BehaviorSubject, Observable } from "rxjs";
import { KoalaListFilterInterface } from "./koala-list-filter.interface";
import { FormGroup } from "@angular/forms";
import { KoalaListFormFilterInterface } from "./koala-list-form-filter.interface";
import { KoalaDynamicComponent } from "../dynamic-component/koala-dynamic-component";
import { KoalaListPageSize } from "./list.abstract";
import { SortDirection } from "@angular/material/sort";

export interface KoalaListConfigInterface {
  columnsToShowInList: string[];
  columnSort?: string;
  sortDirection?: SortDirection;
  itemsMenuListOptions?: KoalaListItemMenuOptionInterface<any>[];
  itemsList: KoalaListItemInterface<any>[];
  request: Observable<any>;
  responseIndexName: string;
  responseQtdResultIndexName: (response: any) => number;
  typeRequest?: 'all' | 'onDemand';
  filterFormConfig: KoalaListFilterInterface;
  reload: BehaviorSubject<boolean>;
  showAdvancedFilter: boolean;
  filterParams?: BehaviorSubject<KoalaListFormFilterInterface>;
  emptyListComponent?: KoalaDynamicComponent;
  qtdListResult?: number;
  getSelectionList: (selection: SelectionModel<any>) => void;
  getDataSource: (dataSource: any[]) => void;
  pageSize?: KoalaListPageSize;
  disabledCheckboxItemList?: (item: any) => boolean;
}
