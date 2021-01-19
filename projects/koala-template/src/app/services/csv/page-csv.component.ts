import { Component } from "@angular/core";
import { PageAbstract } from "../../shared/abstract/page.abstract";
import { ListService } from "../../components/list/list.service";
import { KoalaCsvService } from "../../../../../ngx-koala/src/lib/shared/services/csv/koala.csv.service";

@Component({
  templateUrl: 'page-csv.component.html'
})
export class PageCsvComponent extends PageAbstract {

  constructor(
    private listService: ListService,
    private csvService: KoalaCsvService
  ) {
    super();
  }

  public downloadCsv() {
    this.listService
        .getList({
          params: {},
          sort: 'name',
          order: 'asc',
          page: 1,
          limit: 0
        })
        .subscribe(data => {
          this.csvService.convertJsonToCsv(data, 'koala-csv-service');
        });
  }
}
