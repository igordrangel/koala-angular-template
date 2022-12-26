import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { KoalaQuestionConfigInterface } from './koala-question-config.interface';
import { KoalaLanguageHelper } from "@koalarx/ui/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  templateUrl: 'dialog-question.component.html',
  styleUrls: ['dialog-question.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogQuestionComponent {
  public languageHelper = KoalaLanguageHelper;

  constructor(@Inject(MAT_DIALOG_DATA) public config: KoalaQuestionConfigInterface) {
  }
}
