import { NgModule } from "@angular/core";
import { PageMenuComponent } from "./page-menu.component";
import { CommonModule } from "@angular/common";
import { KoalaFolderPageModule } from "../../../../../ngx-koala/src/folder-page";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule } from "@angular/material/icon";
import { MenuRoutingModule } from "./menu.routing.module";

@NgModule({
  exports: [
    PageMenuComponent
  ],
  declarations: [
    PageMenuComponent
  ],
  imports: [
    CommonModule,
    KoalaFolderPageModule,
    MatExpansionModule,
    MatIconModule,
    MenuRoutingModule
  ]
})
export class MenuModule {}
