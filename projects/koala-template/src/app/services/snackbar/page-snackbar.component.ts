import { Component } from "@angular/core";
import { PageAbstract } from "../../shared/abstract/page.abstract";
import { KoalaSnackbarService } from "../../../../../ngx-koala/src/snackbar";

@Component({
  templateUrl: 'page-snackbar.component.html'
})
export class PageSnackbarComponent extends PageAbstract {

  constructor(
    private snackbarService: KoalaSnackbarService
  ) {
    super();
  }

  public success() {
    this.snackbarService.success('Success');
  }

  public warning() {
    this.snackbarService.warning('Warning');
  }

  public error() {
    this.snackbarService.error('Error');
  }
}
