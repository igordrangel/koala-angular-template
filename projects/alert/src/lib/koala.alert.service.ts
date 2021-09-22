import { Injectable } from '@angular/core';
import { DialogAlertComponent } from './dialog-alert.component';
import { KoalaAlertConfigInterface } from './koala.alert-config.interface';
import { KoalaDialogService } from '@koalarx/ui/dialog';

@Injectable({providedIn: "any"})
export class KoalaAlertService {

  constructor(private dialogService: KoalaDialogService) {
  }

  public create(alertConfig: KoalaAlertConfigInterface) {
    this.dialogService.open(DialogAlertComponent, 'auto', alertConfig);
  }
}
