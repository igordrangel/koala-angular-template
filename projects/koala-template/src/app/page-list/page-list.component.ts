import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ListItemInterface } from '../../../../ngx-koala/src/lib/shared/components/list/list.item.interface';
import { PageListService } from './page-list.service';
import { CountriesInterface } from './countries.interface';
import { ListItemMenuOptionInterface } from '../../../../ngx-koala/src/lib/shared/components/list/list.item-menu-option.interface';
import { ListFilterInterface } from '../../../../ngx-koala/src/lib/shared/components/list/list.filter.interface';
import { DynamicFormTypeFieldEnum } from '../../../../ngx-koala/src/lib/shared/components/form/dynamic-form/enums/dynamic-form-type-field.enum';

@Component({
  templateUrl: 'page-list.component.html'
})
export class PageListComponent implements OnInit {
  public formData: FormGroup;
  public collumns = ['select', 'name', 'capital', 'region', 'options'];
  public itensList: ListItemInterface[];
  public itensMenuListOptions: ListItemMenuOptionInterface[];
  public filterConfig: ListFilterInterface;
  public filter: any;

  constructor(
    private fb: FormBuilder,
    private pageListService: PageListService
  ) {
    this.itensList = [
      {
        label: 'Name',
        columnDef: 'name',
        itemNameProperty: (countrie: CountriesInterface) => countrie.name,
        dblClick: this.editar
      },
      {
        label: 'Capital',
        columnDef: 'capital',
        itemNameProperty: (countrie: CountriesInterface) => countrie.capital,
        dblClick: this.editar
      },
      {
        label: 'Region',
        columnDef: 'region',
        itemNameProperty: (countrie: CountriesInterface) => countrie.region,
        dblClick: this.editar
      }
    ];
    this.itensMenuListOptions = [
      {icon: 'edit', name: 'Editar', action: this.editar, havePermission: true}
    ]
    this.filterConfig = {
      main: [
        {label: 'Name', name: 'name', type: DynamicFormTypeFieldEnum.text, appearance: 'outline'},
        {label: 'Capital', name: 'capital', type: DynamicFormTypeFieldEnum.text, appearance: 'outline'},
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
    console.log(this.filter);
    return this.pageListService.get();
  }

  public editar(countrie: CountriesInterface) {
    console.log(countrie);
  }
}
