import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ListAbstract } from './list.abstract';
import { KoalaListItemMenuOptionInterface } from './koala-list-item-menu-option.interface';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { KoalaListFilterInterface } from './koala-list-filter.interface';
import { KoalaDynamicFormService, KoalaDynamicFormConfigInterface } from '@koalarx/ui/form';
import { KoalaListItemInterface } from './koala-list-item.interface';
import { KoalaListFormFilterInterface } from "./koala-list-form-filter.interface";
import { MatSort, SortDirection } from "@angular/material/sort";
import { delay } from "@koalarx/utils/operators/delay";
import { koala } from "@koalarx/utils";
import { DeviceDetectorService } from "ngx-device-detector";
import { KoalaListConfigInterface } from "./koala.list-config.interface";
import { MatPaginator } from "@angular/material/paginator";
import { KoalaListBtnCollapseSubListConfigInterface } from "./koala-list-btn-collapse-sub-list-config.interface";
import { animate, state, style, transition, trigger } from "@angular/animations";

@Component({
  selector: 'koala-list',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ListComponent extends ListAbstract implements OnInit, AfterViewInit, OnDestroy {
  @Input() public config?: KoalaListConfigInterface;

  @ViewChild(MatPaginator) protected paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) protected sort: MatSort;

  public customClass?: string;
  public columnsToShowInList?: string[];
  public hidePaginator?: boolean = false;
  public columnSort?: string;
  public sortDirection: SortDirection = 'asc';
  public itemsMenuListOptions?: KoalaListItemMenuOptionInterface<any>[];
  public itemsList?: KoalaListItemInterface<any>[];
  public request?: Observable<any>;
  public responseIndexName?: string;
  public responseQtdResultIndexName?: (response: any) => number;
  public responseRequest?: any;
  public typeRequest: 'all' | 'onDemand' = 'all'
  public filterFormConfig?: KoalaListFilterInterface;
  public reload?: BehaviorSubject<boolean>;
  public formFilter?: FormGroup;
  public showAdvancedFilter: boolean = false;
  public qtdListResult = 0;
  public disabledCheckboxItemList?: (item: any) => boolean;
  public expandedElement = false;
  public btnCollapseSubListConfig?: KoalaListBtnCollapseSubListConfigInterface<any>;
  public subListConfig?: (item: any) => KoalaListConfigInterface;

  constructor(
    private fb: FormBuilder,
    private dynamicFormService: KoalaDynamicFormService,
    private deviceService: DeviceDetectorService
  ) {
    super(
      () => this.config?.request ?? new Observable<any>(),
      (response) => {
        this.responseRequest = response;
        this.dataSource.data = this.config?.responseIndexName
                               ? (this.config.responseIndexName
                                  ? response[this.config.responseIndexName]
                                  : [])
                               : response;
        if (this.config?.getDataSource) this.config?.getDataSource(this.dataSource.data);
        this.qtdListResult = this.config?.responseQtdResultIndexName
                             ? this.config.responseQtdResultIndexName(response) ?? 0
                             : this.dataSource.data?.length ?? 0;
      },
      () => this.formFilter ?? fb.group({})
    );
  }

  ngOnInit() {
    this.initConfig();
    this.formFilter = this.fb.group({
      formSearch: this.filterFormConfig?.main?.form ?? [''],
      formAdvancedSearch: this.filterFormConfig?.advanced?.form ?? ['']
    });
    this.loading(true);
    if (this.filterFormConfig) {
      this.filterFormConfig?.main?.formConfig?.map(item => {
        item.class += ' padding-none w-99';
        return item;
      });
      this.filterFormConfig?.advanced?.formConfig?.map(item => {
        item.class += ' padding-none';
        return item;
      });
      if (this.filterFormConfig?.checkAndSearch) {
        this.formFilter.addControl(this.filterFormConfig.checkAndSearch.formControlName, new FormControl(this.filterFormConfig.checkAndSearch.isChecked ?? false));
      }
    }

    if (this.config.getSelectionList) this.config.getSelectionList(this.selection);

    if (this.reload) {
      this.reload.subscribe(async reload => {
        if (reload) {
          await this.filterSubmit();
        }
      });
    }
  }

  ngOnDestroy() {
    super.onDestroy();
  }

  ngAfterViewInit() {
    super.afterViewInit().then();
  }

  public async filterSubmit() {
    this.showAdvancedFilter = false;
    await delay(1);
    let dados = koala(
      this.filterFormConfig?.main?.form
      ? this.dynamicFormService.emitData(this.filterFormConfig?.main?.form)
      : {}
    )
      .object()
      .merge(
        this.filterFormConfig?.advanced?.form
        ? this.dynamicFormService.emitData(this.filterFormConfig?.advanced?.form)
        : {})
      .getValue();

    if (this.filterFormConfig?.checkAndSearch) {
      const controlName = this.filterFormConfig.checkAndSearch.formControlName;
      dados[controlName] = this.formFilter.get(controlName).value;
    }
    await super.search(dados);
  }

  public toogleFilter() {
    this.showAdvancedFilter = !this.showAdvancedFilter;
  }

  public haveOptionsOnItemLine(item: any) {
    return this.itemsMenuListOptions.filter(option => option.havePermission && (
      !option.showByItemList ||
      option.showByItemList(item)
    )).length > 0
  }

  public hasFooter() {
    return !!this.itemsList.find(item => !!item.footer);
  }

  private initConfig() {
    this.columnSort = this.config.columnSort ?? null;
    this.sortDirection = this.config.sortDirection ?? 'asc';
    this.itemsMenuListOptions = this.config.itemsMenuListOptions ?? [];
    this.typeRequest = this.config.typeRequest ?? 'all';
    this.qtdListResult = this.config.qtdListResult ?? 0;
    this.columnsToShowInList = this.config.columnsToShowInList;
    this.itemsList = this.config.itemsList.map(item => {
      if (!item.dblClick) {
        item.dblClick = () => {
        };
      }
      return item;
    });
    this.showAdvancedFilter = this.config.showAdvancedFilter;
    this.filterFormConfig = (this.deviceService.isMobile() ? {
      advanced: koala({})
        .object()
        .merge(this.config.filterFormConfig.main ?? {})
        .merge(this.config.filterFormConfig.advanced ?? {})
        .getValue() as KoalaDynamicFormConfigInterface,
      checkAndSearch: this.config.filterFormConfig.checkAndSearch
    } : this.config.filterFormConfig);
    this.request = this.config.request;
    this.reload = this.config.reload;
    this.responseIndexName = this.config.responseIndexName;
    this.responseQtdResultIndexName = this.config.responseQtdResultIndexName;
    this.filterParams = this.config.filterParams ?? new BehaviorSubject<KoalaListFormFilterInterface>(null);
    this.emptyListComponent = this.config.emptyListComponent;
    this.errorListComponent = this.config.errorListComponent;
    this.pageSize = this.config.pageSize ?? 30;
    this.disabledCheckboxItemList = this.config.disabledCheckboxItemList;
    this.subListConfig = this.config.subListConfig;
    this.btnCollapseSubListConfig = this.config.btnCollapseSubListConfig;
    this.hidePaginator = this.config.hidePaginator;
    this.customClass = this.config.customClass;
  }
}
