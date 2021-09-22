import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { KoalaAlertConfigInterface } from './koala.alert-config.interface';
import { KoalaAlertEnum } from './koala.alert.enum';

@Component({
  templateUrl: 'dialog-alert.component.html',
  styleUrls: ['dialog-alert.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogAlertComponent {
  public icon?: string;
  public iconColor?: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public alert: KoalaAlertConfigInterface
  ) {
    if (alert.alertEnum) {
      switch (alert.alertEnum) {
        case KoalaAlertEnum.success:
          this.icon = 'check_circle';
          this.iconColor = 'success';
          break;
        case KoalaAlertEnum.notFound:
          this.icon = 'visibility_off';
          this.iconColor = 'notFound';
          break;
        case KoalaAlertEnum.internalServerError:
          this.icon = 'error';
          this.iconColor = 'error';
          break;
        case KoalaAlertEnum.badRequest:
          this.icon = 'warning';
          this.iconColor = 'badRequest';
          break;
        case KoalaAlertEnum.unhautorized:
          this.icon = 'no_encryption';
          this.iconColor = 'unhautorized';
          break;
      }
    }
  }
}
