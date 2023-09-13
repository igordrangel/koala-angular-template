import { Injectable } from '@angular/core';
import { KoalaDialogTemplateInterface } from './koala.dialog-template.interface';
import { ComponentType } from '@angular/cdk/overlay';
import { DeviceDetectorService } from "ngx-device-detector";
import { randomString } from "@koalarx/utils/operators/string";
import { MatDialog } from "@angular/material/dialog";

export type KoalaDialogSizeType = 'auto' | 'small' | 'normal' | 'big' | 'mobile';

@Injectable({providedIn: "any"})
export class KoalaDialogService {

  constructor(
    private dialog: MatDialog,
    private deviceService: DeviceDetectorService) {
  }

  public open<T>(
    dialogComponent: ComponentType<T>,
    size: KoalaDialogSizeType,
    data?: any,
    triggerBeforeClosed: string | boolean | object = false,
    beforeClosed?: (event?: any) => void
  ) {
    const dialogRef = this.dialog.open(dialogComponent, this.dialogTemplate(data)[this.deviceService.isMobile() ? 'mobile' : size])
    dialogRef.afterOpened().subscribe(() => {
      history.pushState(null, '', location.href);
      return false;
    });
    dialogRef.beforeClosed().subscribe(event => {
      if ((triggerBeforeClosed && event === triggerBeforeClosed) ||
        (typeof triggerBeforeClosed == 'object' && typeof event == 'object')
      ) {
        if (beforeClosed) {
          beforeClosed(event);
        }
      }
    });
    dialogRef.keydownEvents().subscribe(event => {
      if (event.key === 'Escape') {
        dialogRef.close({closeOnNavigation: true})
      }
    });
  }

  private dialogTemplate(data: any = null): KoalaDialogTemplateInterface {
    let dialogElementId = "dialog-" + randomString(10);

    return {
      auto: {id: dialogElementId, panelClass: ['koala-dialog', 'auto'], disableClose: true, data},
      small: {id: dialogElementId, panelClass: ['koala-dialog', 'small'], disableClose: true, data},
      normal: {id: dialogElementId, panelClass: ['koala-dialog', 'normal'], disableClose: true, data},
      big: {id: dialogElementId, panelClass: ['koala-dialog', 'big'], disableClose: true, data},
      fullScreen: {id: dialogElementId, panelClass: ['koala-dialog'], disableClose: true, data},
      mobile: {
        id: dialogElementId,
        autoFocus: false,
        panelClass: ["koala-dialog", 'mobile'],
        width: '100vw',
        maxWidth: '100vw',
        maxHeight: '90vh',
        data
      }
    };
  }
}
