import { Component } from "@angular/core";
import { PageAbstract } from "../../shared/abstract/page.abstract";
import { KoalaLoaderService } from "@koalarx/ui/common";

@Component({
  templateUrl: 'page-page-loader.component.html'
})
export class PagePageLoaderComponent extends PageAbstract {

  constructor(private loaderService: KoalaLoaderService) {
    super();
  }

  public showLoader() {
    this.loaderService.create({typeLoader: "indeterminate"});
    setTimeout(() => this.loaderService.dismiss(), 2000);
  }
}
