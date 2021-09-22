import { NgModule } from '@angular/core';
import { MenuComponent } from './menu.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { KoalaIconModule } from "@koalarx/ui/icon";

@NgModule({
  declarations: [
    MenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    KoalaIconModule
  ],
  exports: [
    MenuComponent
  ]
})
export class KoalaMenuModule {
}
