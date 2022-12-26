import { NgModule } from '@angular/core';
import { DialogComponent } from './dialog.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  declarations: [
    DialogComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule
  ],
  exports: [
    DialogComponent
  ]
})
export class KoalaDialogModule {
}
