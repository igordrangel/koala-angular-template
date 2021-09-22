import { NgModule } from '@angular/core';
import { DialogQuestionComponent } from './dialog-question.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { KoalaDynamicComponentModule } from '@koalarx/ui/dynamic-component';

@NgModule({
  declarations: [
    DialogQuestionComponent
  ],
  imports: [
    CommonModule,
    KoalaDynamicComponentModule,
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
