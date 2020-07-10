import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ListAbstract } from './list.abstract';
import { ListItemInterface } from './list.item.interface';
import { ListItemMenuOptionInterface } from './list.item-menu-option.interface';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ListFilterInterface } from './list.filter.interface';
import { KoalaObjectHelper } from 'tskoala-helpers/dist/object/koala-object.helper';
import { KoalaDelayHelper } from 'tskoala-helpers/dist/delay/koala-delay.helper';
import { KoalaDynamicFormService } from '../../services/dynamic-forms/koala.dynamic-form.service';

@Component({
  selector: 'koala-list',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.css']
})
export class ListComponent extends ListAbstract implements OnInit, OnChanges {
  @Input() titlePage: string = 'Title';
  @Input() titleIcon: string;
  @Input() customFolderFontColor: string = '#212121';
  @Input() customFolderBackgroudColor: string = '#fff';
  @Input() columnsToShowInList: string[];
  @Input() columnSort: string;
  @Input() itensMenuListOptions: ListItemMenuOptionInterface[];
  @Input() itemsList: ListItemInterface[];
  @Input() request: Observable<any>;
  @Input() responseIndexName: string;
  @Input() responseQtdResultIndexName: (response: any) => number;
  @Input() typeRequest: 'all' | 'onDemand';
  @Input() filterFormConfig: ListFilterInterface;
  @Input() error = () => {
  };
  @ViewChild('folder', {static: true}) private folder: ElementRef;
  @ViewChild('folderTitle', {static: true}) private folderTitle: ElementRef;

  public formSearch: FormGroup;
  public formAdvancedSearch: FormGroup;
  public showAdvancedFilter: boolean = false;

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
        item.class = 'col-4 padding-none';
        item.fieldClass = 'w-99';
        return item;
      });
      this.filterFormConfig?.advanced?.map(item => {
        item.class = 'col-4 padding-none';
        item.fieldClass = 'w-99';
        return item;
      });
      if (this.filterFormConfig?.checkAndSearch) {
        this.formSearch.addControl(this.filterFormConfig.checkAndSearch.formControlName, new FormControl(false));
      }
    }
    this.setCustomBackgroundColor();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.customBackgroudColor) {
      this.setCustomBackgroundColor();
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

  private setCustomBackgroundColor() {
    if (this.customFolderBackgroudColor) {
      const folder = this.folder.nativeElement as HTMLDivElement;
      folder.style.background = this.customFolderBackgroudColor;
    }
    if (this.customFolderFontColor) {
      const folderTitle = this.folderTitle.nativeElement as HTMLDivElement;
      folderTitle.style.color = this.customFolderFontColor;
    }
  }
}
