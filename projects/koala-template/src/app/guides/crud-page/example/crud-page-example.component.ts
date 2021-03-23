import { Component } from "@angular/core";
import { KoalaNavigateHistoryInterface } from "../../../../../../ngx-koala/src/lib/shared/components/folder-page/koala-navigate-history.interface";
import { KoalaDialogService } from "../../../../../../ngx-koala/src/lib/shared/services/dialog/koala.dialog.service";
import { DialogFormItemComponent } from "./dialog/dialog-form-item.component";
import { EmptyListComponent } from "../../../components/list/empty-list/empty-list.component";
import { KoalaListConfigInterface } from "../../../../../../ngx-koala/src/lib/shared/components/list/koala.list-config.interface";
import { KoalaListService } from "../../../../../../ngx-koala/src/lib/shared/services/list/koala.list.service";
import { SelectionModel } from "@angular/cdk/collections";
import { KoalaXlsxService } from "../../../../../../ngx-koala/src/lib/shared/services/xlsx/koala.xlsx.service";
import { ItemInterface, ItemService } from "./item.service";
import { KoalaDynamicFormService } from "../../../../../../ngx-koala/src/lib/shared/services/dynamic-forms/koala.dynamic-form.service";
import { KoalaQuestionService } from "../../../../../../ngx-koala/src/lib/shared/services/question/koala.question.service";

@Component({
  templateUrl: 'crud-page-example.component.html'
})
export class CrudPageExampleComponent {

  public navigateHistory: KoalaNavigateHistoryInterface[] = [
    {name: 'Guides', routerLink: '/guides'},
    {name: 'Crud Page', routerLink: '/guides/crud-page'},
    {name: 'Example'}
  ]
  public listConfig: KoalaListConfigInterface;
  public dataSource?: ItemInterface[];

  private selectedItems?: SelectionModel<ItemInterface>;

  constructor(
    public itemService: ItemService,
    private dynamicFormService: KoalaDynamicFormService,
    private koalaListService: KoalaListService,
    private dialogService: KoalaDialogService,
    private questionService: KoalaQuestionService,
    private xlsxService: KoalaXlsxService
  ) {
    this.listConfig = this.koalaListService
                          .build<ItemInterface>()
                          .defaultFilter({
                            params: {},
                            sort: 'name',
                            order: 'desc',
                            page: 1,
                            limit: 0
                          })
                          .filterConfig({
                            main: this.dynamicFormService
                                      .build()
                                      .field('Name', 'name', 'text').generate()
                                      .generate().formConfig
                          })
                          .service(() => this.itemService.getAll(), 'all')
                          .columns([
                            'select',
                            'name',
                            'description',
                            'options'
                          ])
                          .itemColumn({
                            label: 'Name',
                            columnDef: 'name',
                            sortHeader: 'name',
                            itemNameProperty: item => item.name,
                            dblClick: item => this.dialogList(item)
                          })
                          .itemColumn({
                            label: 'Description',
                            columnDef: 'description',
                            sortHeader: 'description',
                            itemNameProperty: item => item.description.toString(),
                            dblClick: item => this.dialogList(item)
                          })
                          .actionList({
                            icon: 'edit',
                            name: 'Edit',
                            havePermission: true,
                            action: item => this.dialogList(item)
                          })
                          .emptyListComponent(EmptyListComponent)
                          .getDataSource(dataSource => this.dataSource = dataSource)
                          .getSelectionList(selection => this.selectedItems = selection)
                          .pageSize(20)
                          .getConfig();
  }

  public dialogList(item?: ItemInterface) {
    this.dialogService.open(
      DialogFormItemComponent,
      'small',
      item,
      'reloadList',
      () => {
        this.listConfig.reload.next(true);
      }
    );
  }

  public delete() {
    this.questionService
        .open({
          message: 'Do you really want delete the selected items?'
        }, () => {
          this.selectedItems.selected.forEach(item => this.itemService.delete(item.id));
          this.listConfig.reload.next(true);
        });
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
