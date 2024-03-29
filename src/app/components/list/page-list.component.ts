import { Component } from "@angular/core";
import { PageAbstract } from "../../shared/abstract/page.abstract";
import { ListService } from "./list.service";
import { ListItemInterface } from "./list-item.interface";
import { EmptyListComponent } from "./empty-list/empty-list.component";
import { KoalaXlsxService } from "@koalarx/ui/common";
import { KoalaListConfigInterface, KoalaListService } from "@koalarx/ui/list";
import { SelectionModel } from "@angular/cdk/collections";
import { KoalaAlertEnum, KoalaAlertService } from "@koalarx/ui/alert";
import { KoalaDynamicFormService } from "@koalarx/ui/form";
import { ErrorListComponent } from "./error-list/error-list.component";
import { maskCoin } from "@koalarx/utils/operators/number";
import { Observable } from "rxjs";

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
                        'collapseButton',
                        'name',
                        'qtd',
                        'value',
                        'options'
                      ])
                      .disableCheckboxItemList((item => item.qtd === 0))
                      .defineBtnCollapseSubListConfig({
                        icon: 'expand_more',
                        iconColor: '#fff',
                        backgroundColor: 'transparent',
                        show: () => true
                      })
                      .itemColumn({
                        label: 'Name',
                        columnDef: 'name',
                        sortHeader: 'name',
                        itemNameProperty: item => item.name,
                        dblClick: item => this.edit(item),
                        footer: {
                          itemNameProperty: () => 'Total'
                        }
                      })
                      .itemColumn({
                        label: 'Qtd.',
                        columnDef: 'qtd',
                        sortHeader: 'qtd',
                        itemNameProperty: item => item.qtd.toString(),
                        dblClick: item => this.edit(item),
                        footer: {
                          itemNameProperty: responseRequest => {
                            let qtdTotal = 0;
                            responseRequest.forEach(item => qtdTotal += item.qtd);
                            return qtdTotal.toString();
                          }
                        }
                      })
                      .itemColumn({
                        label: 'Value',
                        columnDef: 'value',
                        sortHeader: 'value',
                        itemNameProperty: item => maskCoin(item.value, {prefix: 'US$'}),
                        dblClick: item => this.edit(item),
                        footer: {
                          itemNameProperty: responseRequest => {
                            let total = 0;
                            responseRequest.forEach(item => total += item.value);
                            return maskCoin(total, {prefix: 'US$'});
                          }
                        }
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
                      .setSubList(item =>
                        koalaListService.build<ListItemInterface>()
                                        .columns([
                                          'name',
                                          'qtd',
                                          'value'
                                        ])
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
                                          itemNameProperty: item => maskCoin(item.value, {prefix: 'US$'}),
                                          dblClick: item => this.edit(item)
                                        })
                                        .service(() => new Observable(observe => observe.next([item])))
                                        .hidePaginator()
                                        .setCustomClass('koala-list-sublist-content')
                                        .getConfig()
                      )
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
