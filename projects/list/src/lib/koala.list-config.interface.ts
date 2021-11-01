import { SelectionModel } from "@angular/cdk/collections";
import { KoalaListItemMenuOptionInterface } from "./koala-list-item-menu-option.interface";
import { KoalaListItemInterface } from "./koala-list-item.interface";
import { BehaviorSubject, Observable } from "rxjs";
import { KoalaListFilterInterface } from "./koala-list-filter.interface";
import { KoalaListFormFilterInterface } from "./koala-list-form-filter.interface";
import { KoalaDynamicComponent } from "@koalarx/ui/dynamic-component";
import { KoalaListPageSize } from "./list.abstract";
import { SortDirection } from "@angular/material/sort";
import { KoalaListBtnCollapseSubListConfigInterface } from "./koala-list-btn-collapse-sub-list-config.interface";

export interface KoalaListConfigInterface {
  columnsToShowInList: string[];
  columnSort?: string;
  sortDirection?: SortDirection;
  itemsMenuListOptions?: KoalaListItemMenuOptionInterface<any>[];
  itemsList: KoalaListItemInterface<any>[];
  request: Observable<any>;
  responseIndexName?: string;
  responseQtdResultIndexName: (response: any) => number;
  typeRequest?: 'all' | 'onDemand';
  filterFormConfig: KoalaListFilterInterface;
  reload: BehaviorSubject<boolean>;
  showAdvancedFilter: boolean;
  filterParams?: BehaviorSubject<KoalaListFormFilterInterface>;
  emptyListComponent?: KoalaDynamicComponent;
  errorListComponent?: KoalaDynamicComponent;
  qtdListResult?: number;
  getSelectionList: (selection: SelectionModel<any>) => void;
  getDataSource: (dataSource: any[]) => void;
  pageSize?: KoalaListPageSize;
  disabledCheckboxItemList?: (item: any) => boolean;
  subListConfig?: (item: any) => KoalaListConfigInterface;
  btnCollapseSubListConfig?: KoalaListBtnCollapseSubListConfigInterface<any>;
  hidePaginator?: boolean;
}
