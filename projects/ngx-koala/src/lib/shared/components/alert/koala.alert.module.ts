import { NgModule } from '@angular/core';
import { DialogAlertComponent } from './dialog-alert.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { KoalaAlertService } from '../../services/alert/koala.alert.service';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    DialogAlertComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [
    KoalaAlertService
  ],
  exports: [
    DialogAlertComponent
  ]
})
export class KoalaAlertModule {
}
