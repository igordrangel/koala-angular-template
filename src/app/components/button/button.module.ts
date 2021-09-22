import { NgModule } from "@angular/core";
import { PageButtonComponent } from "./page-button.component";
import { CommonModule } from "@angular/common";
import { MatExpansionModule } from "@angular/material/expansion";
import { ButtonRoutingModule } from "./button.routing.module";
import { MatIconModule } from "@angular/material/icon";
import { KoalaFolderPageModule } from "../../../../../ngx-koala/src/folder-page";
import { KoalaButtonModule } from "../../../../../ngx-koala/src/button";
import { MatTabsModule } from "@angular/material/tabs";

@NgModule({
  exports: [
    PageButtonComponent
  ],
  declarations: [
    PageButtonComponent
  ],
  imports: [
    CommonModule,
    KoalaFolderPageModule,
    KoalaButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatTabsModule,
    ButtonRoutingModule
  ]
})
export class ButtonModule {}
