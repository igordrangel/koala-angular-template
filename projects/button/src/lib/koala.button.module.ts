import { NgModule } from '@angular/core';
import { ButtonComponent } from './button.component';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { KoalaIconModule } from '@koalarx/ui/icon';
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatButtonModule } from "@angular/material/button";

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
