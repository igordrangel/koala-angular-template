import { NgModule } from "@angular/core";
import { PageIconsComponent } from "./page-icons.component";
import { CommonModule } from "@angular/common";
import { KoalaFolderPageModule } from "../../../../../ngx-koala/src/folder-page";
import { KoalaFormModule } from "../../../../../ngx-koala/src/form";
import { KoalaIconModule } from "../../../../../ngx-koala/src/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";
import { IconsRoutingModule } from "./icons.routing.module";

@NgModule({
  exports: [
    PageIconsComponent
  ],
  declarations: [
    PageIconsComponent
  ],
  imports: [
    CommonModule,
    KoalaFormModule,
    KoalaIconModule,
    MatButtonModule,
    MatTooltipModule,
    KoalaFolderPageModule,
    IconsRoutingModule
  ]
})
export class IconsModule {}
