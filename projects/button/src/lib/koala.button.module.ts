import { NgModule } from '@angular/core';
import { ButtonComponent } from './button.component';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { KoalaIconModule } from '@koalarx/ui/icon';

@NgModule({
  declarations: [
    ButtonComponent
  ],
  imports: [
    CommonModule,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
    KoalaIconModule
  ],
  exports: [
    ButtonComponent
  ]
})
export class KoalaButtonModule {
}
