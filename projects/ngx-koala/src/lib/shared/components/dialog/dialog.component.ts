import { Component, Input } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'koala-dialog',
  templateUrl: 'dialog.component.html'
})
export class DialogComponent {
  @Input() title: string;
  @Input() triggerDialogClose: string;
  @Input() btnCloseLabel: string;
  @Input() btnCloseColor: ThemePalette;
}
