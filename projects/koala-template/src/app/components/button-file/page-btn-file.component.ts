import { Component } from "@angular/core";
import { PageAbstract } from "../../shared/abstract/page.abstract";
import { KoalaFileInterface } from "../../../../../ngx-koala/src/lib/shared/components/file-button/koala.file.interface";
import { KoalaBtnFileService } from "../../../../../ngx-koala/src/lib/shared/services/btn-file/koala.btn-file.service";

@Component({
  templateUrl: 'page-btn-file.component.html',
  styleUrls: ['page-btn-file.component.css']
})
export class PageBtnFileComponent extends PageAbstract {
  public files: KoalaFileInterface[] = [];

  constructor(
    public fileService: KoalaBtnFileService
  ) {
    super();
  }
}
