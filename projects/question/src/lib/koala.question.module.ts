import { NgModule } from '@angular/core';
import { DialogQuestionComponent } from './dialog-question.component';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
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
