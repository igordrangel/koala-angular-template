import { NgModule } from "@angular/core";
import { PageIconsAnimatedComponent } from "./page-icons-animated.component";
import { CommonModule } from "@angular/common";
import { KoalaFolderPageModule } from "@koalarx/ui/folder-page";
import { KoalaFormModule } from "@koalarx/ui/form";
import { MatLegacyButtonModule as MatButtonModule } from "@angular/material/legacy-button";
import { MatLegacyTooltipModule as MatTooltipModule } from "@angular/material/legacy-tooltip";
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
