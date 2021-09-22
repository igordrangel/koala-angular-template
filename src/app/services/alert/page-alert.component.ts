import { Component } from "@angular/core";
import { PageAbstract } from "../../shared/abstract/page.abstract";
import { KoalaAlertEnum, KoalaAlertService } from "@koalarx/ui/alert";

@Component({
  templateUrl: 'page-alert.component.html'
})
export class PageAlertComponent extends PageAbstract {

  constructor(private alertService: KoalaAlertService) {
    super();
  }

  public showAlert() {
    this.alertService.create({
      alertEnum: KoalaAlertEnum.success,
      message: 'This is a alert dialog'
    });
  }
}
