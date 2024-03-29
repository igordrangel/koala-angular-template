import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'koala-dialog',
  templateUrl: 'dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogComponent {
  @Input() titleDialog?: string;
  @Input() iconTitleDialog?: string;
  @Input() triggerDialogClose?: string;
  @Input() btnCloseLabel?: string;
  @Input() btnCloseColor: ThemePalette;
}
