import { NgModule } from "@angular/core";
import { DialogExample, PageDialogComponent } from "./page-dialog.component";
import { CommonModule } from "@angular/common";
import { KoalaFolderPageModule } from "../../../../../ngx-koala/src/folder-page";
import { DialogRoutingModule } from "./dialog.routing.module";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule } from "@angular/material/icon";
import { KoalaButtonModule } from "../../../../../ngx-koala/src/button";
import { KoalaDialogModule } from "../../../../../ngx-koala/src/dialog";
import { MatTabsModule } from "@angular/material/tabs";

@NgModule({
  exports: [
    PageDialogComponent
  ],
  declarations: [
    PageDialogComponent,
    DialogExample
  ],
  imports: [
    CommonModule,
    KoalaFolderPageModule,
    KoalaDialogModule,
    KoalaButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatTabsModule,
    DialogRoutingModule
  ]
})
export class DialogModule {}
