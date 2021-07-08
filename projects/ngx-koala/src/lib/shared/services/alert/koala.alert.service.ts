import { Injectable } from '@angular/core';
import { DialogAlertComponent } from '../../components/alert/dialog-alert.component';
import { KoalaAlertConfigInterface } from '../../components/alert/koala.alert-config.interface';
import { KoalaDialogService } from '../dialog/koala.dialog.service';

@Injectable({providedIn: "any"})
export class KoalaAlertService {

  constructor(private dialogService: KoalaDialogService) {
  }

  public create(alertConfig: KoalaAlertConfigInterface) {
    this.dialogService.open(DialogAlertComponent, 'auto', alertConfig);
  }
}
