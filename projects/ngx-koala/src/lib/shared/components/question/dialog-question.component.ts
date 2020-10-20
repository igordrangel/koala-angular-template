import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { KoalaQuestionConfigInterface } from './koala-question-config.interface';

@Component({
  templateUrl: 'dialog-question.component.html',
  styleUrls: ['dialog-question.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogQuestionComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public config: KoalaQuestionConfigInterface) {
  }
}
