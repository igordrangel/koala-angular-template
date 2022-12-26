import { NgModule } from '@angular/core';
import { DialogQuestionComponent } from './dialog-question.component';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { KoalaDynamicComponentModule } from '@koalarx/ui/dynamic-component';
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";

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
