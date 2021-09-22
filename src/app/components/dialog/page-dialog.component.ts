import { Component } from "@angular/core";
import { PageAbstract } from "../../shared/abstract/page.abstract";
import { KoalaDialogService } from "@koalarx/ui/dialog";

@Component({
  template: `
    <koala-dialog
        titleDialog="Dialog"
        iconTitleDialog="launch"
        btnCloseLabel="Close"
        btnCloseColor="warn">
    </koala-dialog>`
})
export class DialogExample {}

@Component({
  templateUrl: 'page-dialog.component.html'
})
export class PageDialogComponent extends PageAbstract {

  constructor(private dialogService: KoalaDialogService) {
    super();
  }

  public openDialog() {
    this.dialogService.open(DialogExample,"small");
  }
}
