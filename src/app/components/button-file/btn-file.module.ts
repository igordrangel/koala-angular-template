import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatExpansionModule } from "@angular/material/expansion";
import { PageBtnFileComponent } from "./page-btn-file.component";
import { BtnFileRoutingModule } from "./btn-file.routing.module";
import { KoalaFolderPageModule } from "@koalarx/ui/folder-page";
import { KoalaFileButtonModule } from "@koalarx/ui/file-button";
import { MatTabsModule } from "@angular/material/tabs";

@NgModule({
  exports: [
    PageBtnFileComponent
  ],
  declarations: [
    PageBtnFileComponent
  ],
  imports: [
    CommonModule,
    KoalaFolderPageModule,
    KoalaFileButtonModule,
    MatListModule,
    MatExpansionModule,
    MatIconModule,
    MatTabsModule,
    BtnFileRoutingModule
  ]
})
export class BtnFileModule {}
