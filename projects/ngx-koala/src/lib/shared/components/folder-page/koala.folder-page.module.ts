import { NgModule } from '@angular/core';
import { FolderComponent } from './folder.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    FolderComponent
  ],
  exports: [
    FolderComponent
  ],
  imports: [
    CommonModule,
    MatIconModule
  ]
})
export class KoalaFolderPageModule {
}
