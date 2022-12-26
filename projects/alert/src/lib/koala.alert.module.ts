import { NgModule } from '@angular/core';
import { DialogAlertComponent } from './dialog-alert.component';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { KoalaAlertService } from './koala.alert.service';
import { CommonModule } from '@angular/common';
import { KoalaDynamicComponentModule } from "@koalarx/ui/dynamic-component";

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
