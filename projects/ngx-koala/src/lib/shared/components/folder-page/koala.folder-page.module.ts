import { NgModule } from '@angular/core';
import { FolderComponent } from './folder.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import {RouterModule} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [
    FolderComponent
  ],
  exports: [
    FolderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class KoalaFolderPageModule {
}
