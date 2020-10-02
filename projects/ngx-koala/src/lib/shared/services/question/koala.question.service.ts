import { Injectable } from '@angular/core';
import { DialogQuestionComponent } from '../../components/question/dialog-question.component';
import { KoalaDialogService } from '../dialog/koala.dialog.service';
import { KoalaQuestionConfigInterface } from '../../components/question/koala-question-config.interface';

@Injectable()
export class KoalaQuestionService {
  
  constructor(private dialogService: KoalaDialogService) {
  }
  
  public open(config: KoalaQuestionConfigInterface, yesCallback?: () => void, noCallback?: () => void) {
    this.dialogService.open(DialogQuestionComponent, 'small', config, {},
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
