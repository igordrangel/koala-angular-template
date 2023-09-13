import { NgModule } from "@angular/core";
import { PageIconsAnimatedComponent } from "./page-icons-animated.component";
import { CommonModule } from "@angular/common";
import { KoalaFolderPageModule } from "@koalarx/ui/folder-page";
import { KoalaFormModule } from "@koalarx/ui/form";
import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";
import { IconsAnimatedRoutingModule } from "./icons-animated.routing.module";
import { KoalaIconsAnimatedModule } from "@koalarx/ui/icons-animated";

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
