import { Component } from "@angular/core";
import { PageAbstract } from "../../shared/abstract/page.abstract";
import { ListService } from "./list.service";
import { FormGroup } from "@angular/forms";
import { KoalaListItemInterface } from "../../../../../ngx-koala/src/lib/shared/components/list/koala-list-item.interface";
import { KoalaListFilterInterface } from "../../../../../ngx-koala/src/lib/shared/components/list/koalaListFilterInterface";
import { KoalaListItemMenuOptionInterface } from "../../../../../ngx-koala/src/lib/shared/components/list/koala-list-item-menu-option.interface";
import { BehaviorSubject } from "rxjs";
import { KoalaListFormFilterInterface } from "../../../../../ngx-koala/src/lib/shared/components/list/koala-list-form-filter.interface";
import { SelectionModel } from "@angular/cdk/collections";
import { ListItemInterface } from "./list-item.interface";
import { koala } from "koala-utils";
import { DynamicFormTypeFieldEnum } from "../../../../../ngx-koala/src/lib/shared/components/form/dynamic-form/enums/dynamic-form-type-field.enum";
import { KoalaDynamicComponent } from "../../../../../ngx-koala/src/lib/shared/components/dynamic-component/koala-dynamic-component";
import { EmptyListComponent } from "./empty-list/empty-list.component";
import { KoalaXlsxService } from "../../../../../ngx-koala/src/lib/shared/services/xlsx/koala.xlsx.service";

@Component({
  templateUrl: 'page-list.component.html'
})
export class PageListComponent extends PageAbstract {
  public formData: FormGroup;
  public columns = [
    'select',
    'name',
    'qtd',
    'value',
    'options'
  ];
  public itensList: KoalaListItemInterface[];
  public itensMenuListOptions: KoalaListItemMenuOptionInterface[];
  public filterConfig: KoalaListFilterInterface;
  public filter = new BehaviorSubject<KoalaListFormFilterInterface>({
    params: {},
    sort: 'name',
    order: 'asc',
    page: 1,
    limit: 0
  });
  public selection: SelectionModel<ListItemInterface>;
  public dataSource?: ListItemInterface[];
  public emptyListComponent = new KoalaDynamicComponent(EmptyListComponent);
  public reloadList = new BehaviorSubject<boolean>(false);

  constructor(
    public listService: ListService,
    private xlsxService: KoalaXlsxService
  ) {
    super();
    this.itensList = [{
      label: 'Name',
      columnDef: 'name',
      sortHeader: 'name',
      itemNameProperty: (item: ListItemInterface) => item.name,
      dblClick: (item: ListItemInterface) => this.edit(item)
    }, {
      label: 'Qtd.',
      columnDef: 'qtd',
      sortHeader: 'qtd',
      itemNameProperty: (item: ListItemInterface) => item.qtd.toString(),
      dblClick: (item: ListItemInterface) => this.edit(item)
    }, {
      label: 'Value',
      columnDef: 'value',
      sortHeader: 'value',
      itemNameProperty: (item: ListItemInterface) => koala(item.qtd).number().maskCoin('US$ ').getValue(),
      dblClick: (item: ListItemInterface) => this.edit(item)
    }];

    this.itensMenuListOptions = [{
      icon: 'edit',
      name: 'Edit',
      havePermission: true,
      action: (item: ListItemInterface) => this.edit(item)
    }];

    this.filterConfig = {
      main: [
        {
          label: 'Name',
          name: 'name',
          type: DynamicFormTypeFieldEnum.text,
          appearance: 'outline',
          floatLabel: "always",
          class: 'col-12'
        }
      ]
    };
  }

  public edit(item: ListItemInterface) {
    console.log(item);
  }

  public downloadList() {
    this.xlsxService.convertJsonToXlsx(this.dataSource, {
      filename: 'koala-list',
      sheetName: 'Koala List',
      title: 'Sheet of Koala List',
      titleFontColor: '#b71c1c',
      titleBackgroundColor: '#ffffff',
      headerFontColor: '#ffffff',
      headerBackgroundColor: '#b71c1c'
    });
  }
}
