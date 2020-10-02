import { KoalaAlertEnum } from './koala.alert.enum';
import { ThemePalette } from '@angular/material/core';

export interface KoalaAlertConfigInterface {
  alertEnum: KoalaAlertEnum;
  message: string;
  actions?: {
    show: boolean;
    color: ThemePalette;
    action: () => void;
    text: string;
  }[]
}
