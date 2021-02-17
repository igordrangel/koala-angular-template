import { Component } from "@angular/core";
import { PageAbstract } from "../../shared/abstract/page.abstract";
import { ListService } from "./list.service";
import { FormGroup } from "@angular/forms";
import { ListItemInterface } from "./list-item.interface";
import { koala } from "koala-utils";
import { DynamicFormTypeFieldEnum } from "../../../../../ngx-koala/src/lib/shared/components/form/dynamic-form/enums/dynamic-form-type-field.enum";
import { EmptyListComponent } from "./empty-list/empty-list.component";
import { KoalaXlsxService } from "../../../../../ngx-koala/src/lib/shared/services/xlsx/koala.xlsx.service";
import { KoalaListConfigInterface } from "../../../../../ngx-koala/src/lib/shared/components/list/koala.list-config.interface";
import { KoalaListService } from "../../../../../ngx-koala/src/lib/shared/services/list/koala.list.service";
import { SelectionModel } from "@angular/cdk/collections";
import { KoalaAlertService } from "../../../../../ngx-koala/src/lib/shared/services/alert/koala.alert.service";
import { KoalaAlertEnum } from "../../../../../ngx-koala/src/lib/shared/components/alert/koala.alert.enum";

@Component({
  templateUrl: 'page-list.component.html'
})
export class PageListComponent extends PageAbstract {
  public formData: FormGroup;
  public dataSource?: ListItemInterface[];
  public config: KoalaListConfigInterface;
  private selectedItems?: SelectionModel<ListItemInterface>;

  constructor(
    public listService: ListService,
    private koalaListService: KoalaListService,
    private alertService: KoalaAlertService,
    private xlsxService: KoalaXlsxService
  ) {
    super();
    this.config = this.koalaListService
                      .build<ListItemInterface>()
                      .defaultFilter({
                        params: {},
                        sort: 'name',
                        order: 'desc',
                        page: 1,
                        limit: 0
                      })
                      .filterConfig({
                        main: [{
                          label: 'Name',
                          name: 'name',
                          type: DynamicFormTypeFieldEnum.text,
                          appearance: 'outline',
                          floatLabel: "always",
                          class: 'col-12'
                        }]
                      })
                      .service(filter => this.listService.getList(filter.getValue()), 'onDemand')
                      .columns([
                        'select',
                        'name',
                        'qtd',
                        'value',
                        'options'
                      ])
                      .itemColumn({
                        label: 'Name',
                        columnDef: 'name',
                        sortHeader: 'name',
                        itemNameProperty: (item: ListItemInterface) => item.name,
                        dblClick: (item: ListItemInterface) => this.edit(item)
                      })
                      .itemColumn({
                        label: 'Qtd.',
                        columnDef: 'qtd',
                        sortHeader: 'qtd',
                        itemNameProperty: (item: ListItemInterface) => item.qtd.toString(),
                        dblClick: (item: ListItemInterface) => this.edit(item)
                      })
                      .itemColumn({
                        label: 'Value',
                        columnDef: 'value',
                        sortHeader: 'value',
                        itemNameProperty: (item: ListItemInterface) => koala(item.qtd).number().maskCoin('US$ ').getValue(),
                        dblClick: (item: ListItemInterface) => this.edit(item)
                      })
                      .actionList({
                        icon: 'edit',
                        name: 'Edit',
                        havePermission: true,
                        action: (item: ListItemInterface) => this.edit(item)
                      })
                      .emptyListComponent(EmptyListComponent)
                      .getDataSource(dataSource => this.dataSource = dataSource)
                      .getSelectionList(selection => this.selectedItems = selection)
                      .pageSize(20)
                      .getConfig();
  }

  public edit(item: ListItemInterface) {
    console.log(item);
  }

  public delete() {
    console.log(this.selectedItems.selected);
    this.alertService.create({
      alertEnum: KoalaAlertEnum.success,
      message: 'The selected items was showed in devTools console. Press F12 to view.'
    })
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
