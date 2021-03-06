import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ListAbstract } from './list.abstract';
import { KoalaListItemMenuOptionInterface } from './koala-list-item-menu-option.interface';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { KoalaListFilterInterface } from './koala-list-filter.interface';
import { KoalaDynamicFormService } from '../../services/dynamic-forms/koala.dynamic-form.service';
import { KoalaListItemInterface } from './koala-list-item.interface';
import { KoalaListFormFilterInterface } from "./koala-list-form-filter.interface";
import { SortDirection } from "@angular/material/sort";
import { KlDelay } from "koala-utils/dist/utils/KlDelay";
import { koala } from "koala-utils";

@Component({
  selector: 'koala-list',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent extends ListAbstract implements OnInit {
  public columnsToShowInList: string[];
  public columnSort: string;
  public sortDirection: SortDirection = 'asc';
  public itemsMenuListOptions: KoalaListItemMenuOptionInterface<any>[];
  public itemsList: KoalaListItemInterface<any>[];
  public request: Observable<any>;
  public responseIndexName: string;
  public responseQtdResultIndexName: (response: any) => number;
  public typeRequest: 'all' | 'onDemand';
  public filterFormConfig: KoalaListFilterInterface;
  public reload: BehaviorSubject<boolean>;
  public formFilter: FormGroup;
  public showAdvancedFilter: boolean = false;
  public qtdListResult = 0;
  public disabledCheckboxItemList?: (item: any) => boolean;

  constructor(
    private fb: FormBuilder,
    private dynamicFormService: KoalaDynamicFormService
  ) {
    super(
      () => this.config.request,
      (response) => {
        this.dataSource.data = this.config.responseIndexName ?
          response[this.config.responseIndexName] :
          response;
        if (this.config.getDataSource) this.config.getDataSource(this.dataSource.data);
        this.qtdListResult = this.config.responseQtdResultIndexName ?
          this.config.responseQtdResultIndexName(response) :
          this.dataSource.data.length;
      },
      () => this.formFilter
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

    if(this.config.getSelectionList) this.config.getSelectionList(this.selection);

    if (this.reload) {
      this.reload.subscribe(async reload => {
        if (reload) {
          await this.filterSubmit();
        }
      });
    }
  }

  public async filterSubmit() {
    this.showAdvancedFilter = false;
    await KlDelay.waitFor(1);
    let dados = (this.filterFormConfig?.main?.form ? koala(this.dynamicFormService.emitData(this.filterFormConfig?.main?.form))
      .object()
      .merge(this.filterFormConfig?.advanced?.form ? this.dynamicFormService.emitData(this.filterFormConfig?.advanced?.form) : {})
      .getValue() : null);

    if (this.filterFormConfig?.checkAndSearch) {
      const controlName = this.filterFormConfig.checkAndSearch.formControlName;
      dados[controlName] = this.formFilter.get(controlName).value;
    }
    await super.search(dados);
  }

  public toogleFilter() {
    this.showAdvancedFilter = !this.showAdvancedFilter;
  }

  private initConfig() {
    this.columnSort = this.config.columnSort ?? null;
    this.sortDirection = this.config.sortDirection ?? 'asc';
    this.itemsMenuListOptions = this.config.itemsMenuListOptions ?? [];
    this.typeRequest = this.config.typeRequest ?? 'all';
    this.qtdListResult = this.config.qtdListResult ?? 0;
    this.columnsToShowInList = this.config.columnsToShowInList;
    this.itemsList = this.config.itemsList.map(item => {
      if (!item.dblClick) { item.dblClick = () => {}; }
      return item;
    });
    this.showAdvancedFilter = this.config.showAdvancedFilter;
    this.filterFormConfig = this.config.filterFormConfig;
    this.request = this.config.request;
    this.reload = this.config.reload;
    this.responseIndexName = this.config.responseIndexName;
    this.responseQtdResultIndexName = this.config.responseQtdResultIndexName;
    this.filterParams = this.config.filterParams ?? new BehaviorSubject<KoalaListFormFilterInterface>(null);
    this.emptyListComponent = this.config.emptyListComponent;
    this.pageSize = this.config.pageSize ?? 30;
    this.disabledCheckboxItemList = this.config.disabledCheckboxItemList;
  }
}
