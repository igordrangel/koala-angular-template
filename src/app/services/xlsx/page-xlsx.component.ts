import { Component } from "@angular/core";
import { PageAbstract } from "../../shared/abstract/page.abstract";
import { KoalaXlsxService } from "@koalarx/ui/core";
import { ListService } from "../../components/list/list.service";

@Component({
  templateUrl: 'page-xlsx.component.html'
})
export class PageXlsxComponent extends PageAbstract {

  constructor(
    private listService: ListService,
    private xlsxService: KoalaXlsxService
  ) {
    super();
  }

  public downloadXlsx() {
    this.listService
        .getList({
          params: {},
          sort: 'name',
          order: 'asc',
          page: 1,
          limit: 0
        })
        .subscribe(data => {
          this.xlsxService.convertJsonToXlsx(data, {
            filename: 'koala-xlsx-service',
            sheetName: 'Koala XLSX Service',
            title: 'Sheet of Koala XLSX Service',
            titleFontColor: '#b71c1c',
            titleBackgroundColor: '#ffffff',
            headerFontColor: '#ffffff',
            headerBackgroundColor: '#b71c1c'
          });
        });
  }
}
