import { NgModule } from '@angular/core';
import { DialogAlertComponent } from './dialog-alert.component';
import { MatIconModule } from '@angular/material/icon';
import { KoalaAlertService } from './koala.alert.service';
import { CommonModule } from '@angular/common';
import { KoalaDynamicComponentModule } from "@koalarx/ui/dynamic-component";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  declarations: [
    DialogAlertComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    KoalaDynamicComponentModule
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
