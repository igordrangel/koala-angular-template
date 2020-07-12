import { NgModule } from '@angular/core';
import { DialogQuestionComponent } from './dialog-question.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    DialogQuestionComponent
  ],
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    DialogQuestionComponent
  ]
})
export class KoalaQuestionModule {
}
