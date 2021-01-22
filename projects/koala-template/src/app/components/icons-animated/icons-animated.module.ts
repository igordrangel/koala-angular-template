import { NgModule } from "@angular/core";
import { PageIconsAnimatedComponent } from "./page-icons-animated.component";
import { CommonModule } from "@angular/common";
import { KoalaFolderPageModule } from "../../../../../ngx-koala/src/lib/shared/components/folder-page/koala.folder-page.module";
import { KoalaFormModule } from "../../../../../ngx-koala/src/lib/shared/components/form/koala.form.module";
import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";
import { IconsAnimatedRoutingModule } from "./icons-animated.routing.module";
import { KoalaIconsAnimatedModule } from "../../../../../ngx-koala/src/lib/shared/components/icons-animated/koala-icons-animated.module";

@NgModule({
  exports: [
    PageIconsAnimatedComponent
  ],
  declarations: [
    PageIconsAnimatedComponent
  ],
  imports: [
    CommonModule,
    KoalaFormModule,
    KoalaIconsAnimatedModule,
    MatButtonModule,
    MatTooltipModule,
    KoalaFolderPageModule,
    IconsAnimatedRoutingModule
  ]
})
export class IconsAnimatedModule {}
