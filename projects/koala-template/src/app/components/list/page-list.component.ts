import { Component } from "@angular/core";
import { PageAbstract } from "../../shared/abstract/page.abstract";
import { ListService } from "./list.service";
import { ListItemInterface } from "./list-item.interface";
import { koala } from "koala-utils";
import { EmptyListComponent } from "./empty-list/empty-list.component";
import { KoalaXlsxService } from "../../../../../ngx-koala/src/lib/shared/services/xlsx/koala.xlsx.service";
import { KoalaListConfigInterface } from "../../../../../ngx-koala/src/lib/shared/components/list/koala.list-config.interface";
import { KoalaListService } from "../../../../../ngx-koala/src/lib/shared/services/list/koala.list.service";
import { SelectionModel } from "@angular/cdk/collections";
import { KoalaAlertService } from "../../../../../ngx-koala/src/lib/shared/services/alert/koala.alert.service";
import { KoalaAlertEnum } from "../../../../../ngx-koala/src/lib/shared/components/alert/koala.alert.enum";
import { KoalaDynamicFormService } from "../../../../../ngx-koala/src/lib/shared/services/dynamic-forms/koala.dynamic-form.service";
import { ErrorListComponent } from "./error-list/error-list.component";

@Component({
  templateUrl: 'page-list.component.html'
})
export class PageListComponent extends PageAbstract {
  public dataSource?: ListItemInterface[];
  public config: KoalaListConfigInterface;
  private selectedItems?: SelectionModel<ListItemInterface>;

  constructor(
    dynamicFormService: KoalaDynamicFormService,
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
                        main: dynamicFormService.build()
                                                .field('Name', 'name', "text").generate()
                                                .generate()
                      })
                      .service(filter => this.listService.getList(filter.getValue()))
                      .columns([
                        'select',
                        'name',
                        'qtd',
                        'value',
                        'options'
                      ])
                      .disableCheckboxItemList((item => item.qtd === 0))
                      .itemColumn({
                        label: 'Name',
                        columnDef: 'name',
                        sortHeader: 'name',
                        itemNameProperty: item => item.name,
                        dblClick: item => this.edit(item)
                      })
                      .itemColumn({
                        label: 'Qtd.',
                        columnDef: 'qtd',
                        sortHeader: 'qtd',
                        itemNameProperty: item => item.qtd.toString(),
                        dblClick: item => this.edit(item)
                      })
                      .itemColumn({
                        label: 'Value',
                        columnDef: 'value',
                        sortHeader: 'value',
                        itemNameProperty: item => koala(item.qtd).number().maskCoin('US$ ').getValue(),
                        dblClick: item => this.edit(item)
                      })
                      .actionList({
                        icon: 'edit',
                        name: 'Edit',
                        havePermission: true,
                        showByItemList: item => item.qtd > 0,
                        action: item => this.edit(item)
                      })
                      .emptyListComponent(EmptyListComponent)
                      .errorListComponent(ErrorListComponent)
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
    }).then();
  }
}
