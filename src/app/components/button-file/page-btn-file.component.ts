import { Component } from "@angular/core";
import { PageAbstract } from "../../shared/abstract/page.abstract";
import { KoalaFileInterface, KoalaBtnFileService } from "@koalarx/ui/file-button";

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
