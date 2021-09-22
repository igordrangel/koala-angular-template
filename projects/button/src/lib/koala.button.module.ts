import { NgModule } from '@angular/core';
import { ButtonComponent } from './button.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
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
