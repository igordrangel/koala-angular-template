import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ListAbstract } from './list.abstract';
import { ListItemInterface } from './list.item.interface';
import { ListItemMenuOptionInterface } from './list.item-menu-option.interface';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ListFilterInterface } from './list.filter.interface';
import { DynamicFormService } from '../form/dynamic-form/dynamic-form.service';

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
  @Input() formSearch: FormGroup;
  @Input() request: Observable<any> | Promise<any>;
  @Input() responseIndexName: string;
  @Input() responseQtdResultIndexName: (response: any) => number;
  @Input() typeRequest: 'all' | 'onDemand';
  @Input() filterFormConfig: ListFilterInterface;
  @Input() error = () => {
  };
  @ViewChild('folder', {static: true}) private folder: ElementRef;
  @ViewChild('folderTitle', {static: true}) private folderTitle: ElementRef;

  constructor(
    private dynamicFormService: DynamicFormService
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
    if (this.filterFormConfig) {
      this.filterFormConfig?.main?.map(item => {
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

  public filterSubmit() {
    const formArray = this.formSearch.get('formData') as FormArray;
    super.search(this.dynamicFormService.emitData(formArray));
  }

  public toogleFilter() {
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
