import { Injectable } from '@angular/core';
import { DialogQuestionComponent } from '../../components/question/dialog-question.component';
import { KoalaDialogService } from '../dialog/koala.dialog.service';

@Injectable()
export class KoalaQuestionService {

  constructor(private dialogService: KoalaDialogService) {
  }

  public open(message: string, yesCallback?: () => void, noCallback?: () => void) {
    this.dialogService.open(DialogQuestionComponent, 'small', message, {},
      (answer: { question: boolean }) => {
        if (answer.question && yesCallback) {
          yesCallback();
        } else if (!answer.question && noCallback) {
          noCallback();
        }
      }
    )
  }
}
