import { KoalaAlertEnum } from './koala.alert.enum';
import { ThemePalette } from '@angular/material/core';
import {KoalaDynamicComponent} from "../dynamic-component/koala-dynamic-component";

export interface KoalaAlertConfigInterface {
  avatar?: KoalaDynamicComponent;
  alertEnum?: KoalaAlertEnum;
  message: string;
  actions?: {
    show: boolean;
    color: ThemePalette;
    action: () => void;
    text: string;
  }[]
}
