import { Injectable } from '@angular/core';
import { DialogQuestionComponent } from './dialog-question.component';
import { KoalaDialogService } from '../dialog/koala.dialog.service';
import { KoalaQuestionConfigInterface } from './koala-question-config.interface';

@Injectable({providedIn: "any"})
export class KoalaQuestionService {

  constructor(private dialogService: KoalaDialogService) {
  }

  public open(config: KoalaQuestionConfigInterface, yesCallback?: () => void, noCallback?: () => void) {
    this.dialogService.open(DialogQuestionComponent, 'auto', config, {},
      (answer: { question: boolean }) => {
        if (answer.question && yesCallback) {
          yesCallback();
        } else if (!answer.question && noCallback) {
          noCallback();
        }
      }
    );
  }
}
