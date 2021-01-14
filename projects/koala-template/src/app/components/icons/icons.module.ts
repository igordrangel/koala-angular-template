import { NgModule } from "@angular/core";
import { PageIconsComponent } from "./page-icons.component";
import { CommonModule } from "@angular/common";
import { KoalaFolderPageModule } from "../../../../../ngx-koala/src/lib/shared/components/folder-page/koala.folder-page.module";
import { KoalaFormModule } from "../../../../../ngx-koala/src/lib/shared/components/form/koala.form.module";
import { KoalaIconModule } from "../../../../../ngx-koala/src/lib/shared/components/icon/koala.icon.module";
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
