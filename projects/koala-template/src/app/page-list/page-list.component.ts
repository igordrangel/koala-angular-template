import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ListItemInterface } from '../../../../ngx-koala/src/lib/shared/components/list/list.item.interface';
import { PageListService } from './page-list.service';
import { CountriesInterface } from './countries.interface';
import { ListItemMenuOptionInterface } from '../../../../ngx-koala/src/lib/shared/components/list/list.item-menu-option.interface';
import { ListFilterInterface } from '../../../../ngx-koala/src/lib/shared/components/list/list.filter.interface';
import { DynamicFormTypeFieldEnum } from '../../../../ngx-koala/src/lib/shared/components/form/dynamic-form/enums/dynamic-form-type-field.enum';
import { BehaviorSubject } from 'rxjs';
import { ListFormFilterInterface } from '../../../../ngx-koala/src/lib/shared/components/list/list.form-filter.interface';
import { KoalaDialogService } from '../../../../ngx-koala/src/lib/shared/services/dialog/koala.dialog.service';
import { DialogPageListComponent } from './forms/insert/dialog-page-list.component';

@Component({
  templateUrl: 'page-list.component.html'
})
export class PageListComponent implements OnInit {
  public formData: FormGroup;
  public collumns = ['select', 'name', 'capital', 'region', 'options'];
  public itensList: ListItemInterface[];
  public itensMenuListOptions: ListItemMenuOptionInterface[];
  public filterConfig: ListFilterInterface;
  public filter = new BehaviorSubject<ListFormFilterInterface>(null);

  constructor(
    private fb: FormBuilder,
    private pageListService: PageListService,
    private dialogService: KoalaDialogService
  ) {
    this.itensList = [
      {
        label: 'Name',
        columnDef: 'name',
        itemNameProperty: (countrie: CountriesInterface) => countrie.name,
        dblClick: <CountriesInterface>(countrie) => this.dialogList(countrie)
      },
      {
        label: 'Capital',
        columnDef: 'capital',
        itemNameProperty: (countrie: CountriesInterface) => countrie.capital,
        dblClick: <CountriesInterface>(countrie) => this.dialogList(countrie)
      },
      {
        label: 'Region',
        columnDef: 'region',
        itemNameProperty: (countrie: CountriesInterface) => countrie.region,
        dblClick: <CountriesInterface>(countrie) => this.dialogList(countrie)
      }
    ];
    this.itensMenuListOptions = [
      {
        icon: 'edit',
        name: 'Editar',
        action: <CountriesInterface>(countrie) => this.dialogList(countrie),
        havePermission: true
      }
    ]
    this.filterConfig = {
      main: [
        {label: 'Name', name: 'name', type: DynamicFormTypeFieldEnum.text, appearance: 'outline'},
        {label: 'Capital', name: 'capital', type: DynamicFormTypeFieldEnum.text, appearance: 'outline'}
      ],
      advanced: [
        {label: 'Region', name: 'region', type: DynamicFormTypeFieldEnum.text, appearance: 'outline'}
      ],
      checkAndSearch: {
        formControlName: 'trash',
        label: 'Lixeira'
      }
    }
  }

  ngOnInit() {
    this.formData = this.fb.group({});
  }

  public buscar() {
    const filter = this.filter?.value;
    return this.pageListService.get(filter?.params);
  }

  public dialogList(countrie?: CountriesInterface) {
    this.dialogService.open(
      DialogPageListComponent,
      'small',
      countrie,
      'reloadList',
      () => this.buscar()
    );
  }
}
