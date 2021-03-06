import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { KoalaDialogTemplateInterface } from './koala.dialog-template.interface';
import { ComponentType } from '@angular/cdk/overlay';
import { koala } from "koala-utils";

export type KoalaDialogSizeType = 'auto' | 'small' | 'normal' | 'big' | 'mobile';

@Injectable({providedIn: "any"})
export class KoalaDialogService {

  constructor(private dialog: MatDialog) {
  }

  public open<T>(
    dialogComponent: ComponentType<T>,
    size: KoalaDialogSizeType,
    data?: any,
    triggerBeforeClosed: string | boolean | object = false,
    beforeClosed?: (event?) => void
  ) {
    const dialogRef = this.dialog.open(dialogComponent, this.dialogTemplate(data)[size])
    dialogRef.afterOpened().subscribe(() => {
      history.pushState(null, null, location.href);
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
    dialogRef.disableClose = true;
  }

  private dialogTemplate(data: any = null): KoalaDialogTemplateInterface {
    let dialogElementId = "dialog-" + koala('').string().random(10, true).getValue();

    return {
      auto: {id: dialogElementId, panelClass: ['koala-dialog', 'auto'], data},
      small: {id: dialogElementId, panelClass: ['koala-dialog', 'small'], data},
      normal: {id: dialogElementId, panelClass: ['koala-dialog', 'normal'], data},
      big: {id: dialogElementId, panelClass: ['koala-dialog', 'big'], data},
      fullScreen: {id: dialogElementId, panelClass: ['koala-dialog'], data},
      mobile: {
        id: dialogElementId,
        autoFocus: false,
        panelClass: ["koala-dialog-mobile"],
        width: '100vw',
        maxWidth: '100vw',
        height: '100vh',
        data
      }
    };
  }
}
