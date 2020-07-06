import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ListItemInterface } from '../../../../ngx-koala/src/lib/shared/components/list/list.item.interface';
import { PageListService } from './page-list.service';
import { CountriesInterface } from './countries.interface';
import { ListItemMenuOptionInterface } from '../../../../ngx-koala/src/lib/shared/components/list/list.item-menu-option.interface';

@Component({
  templateUrl: 'page-list.component.html'
})
export class PageListComponent {
  public formData: FormGroup;
  public collumns = ['select', 'name', 'capital', 'region', 'options'];
  public itensList: ListItemInterface[];
  public itensMenuListOptions: ListItemMenuOptionInterface[];

  constructor(
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
  }

  public buscar() {
    return this.pageListService.get();
  }

  public editar(countrie: CountriesInterface) {
    console.log(countrie);
  }
}
