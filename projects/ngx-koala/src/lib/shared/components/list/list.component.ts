import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ListAbstract } from './list.abstract';
import { ListItemMenuOptionInterface } from './list.item-menu-option.interface';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { ListFilterInterface } from './list.filter.interface';
import { KoalaObjectHelper } from 'tskoala-helpers/dist/object/koala-object.helper';
import { KoalaDelayHelper } from 'tskoala-helpers/dist/delay/koala-delay.helper';
import { KoalaDynamicFormService } from '../../services/dynamic-forms/koala.dynamic-form.service';
import { SelectionModel } from '@angular/cdk/collections';
import { KoalaListItemInterface } from './koala-list-item.interface';

@Component({
  selector: 'koala-list',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent extends ListAbstract implements OnInit {
  @Input() columnsToShowInList: string[];
  @Input() columnSort: string;
  @Input() itensMenuListOptions: ListItemMenuOptionInterface[];
  @Input() itemsList: KoalaListItemInterface[];
  @Input() request: Observable<any>;
  @Input() responseIndexName: string;
  @Input() responseQtdResultIndexName: (response: any) => number;
  @Input() typeRequest: 'all' | 'onDemand';
  @Input() filterFormConfig: ListFilterInterface;
  @Input() error = () => {
  };
  @Input() reload: BehaviorSubject<boolean>;
  @Output() getSelection = new EventEmitter<SelectionModel<object>>(null);
  @Output() getDataSource = new EventEmitter<any[]>(null);

  public formSearch: FormGroup;
  public formAdvancedSearch: FormGroup;
  public showAdvancedFilter: boolean = false;
  public qtdListResult = 0;

  constructor(
    private fb: FormBuilder,
    private dynamicFormService: KoalaDynamicFormService
  ) {
    super(
      () => this.request,
      (response) => {
        this.dataSource.data = this.responseIndexName ?
          response[this.responseIndexName] :
          response;
        this.getDataSource.emit(this.dataSource.data);
        this.qtdListResult = this.responseQtdResultIndexName ?
          this.responseQtdResultIndexName(response) :
          this.dataSource.data.length;
      },
      () => this.error(),
      () => this.formSearch
    );
  }

  ngOnInit() {
    this.formSearch = this.fb.group({});
    this.formAdvancedSearch = this.fb.group({});
    if (this.filterFormConfig) {
      this.filterFormConfig?.main?.map(item => {
        item.class = item.class + ' padding-none';
        item.fieldClass = 'w-99';
        return item;
      });
      this.filterFormConfig?.advanced?.map(item => {
        item.class = item.class + ' padding-none';
        item.fieldClass = 'w-99';
        return item;
      });
      if (this.filterFormConfig?.checkAndSearch) {
        this.formSearch.addControl(this.filterFormConfig.checkAndSearch.formControlName, new FormControl(false));
      }
    }
    this.getSelection.emit(this.selection);
  
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
    await KoalaDelayHelper.waitFor(1);
    let dados = KoalaObjectHelper.merge(
      this.dynamicFormService.emitData(this.formSearch),
      this.dynamicFormService.emitData(this.formAdvancedSearch)
    );
    if (this.filterFormConfig?.checkAndSearch) {
      const controlName = this.filterFormConfig.checkAndSearch.formControlName;
      dados[controlName] = this.formSearch.get(controlName).value;
    }
    await super.search(dados);
  }

  public toogleFilter() {
    this.showAdvancedFilter = !this.showAdvancedFilter;
  }
}
