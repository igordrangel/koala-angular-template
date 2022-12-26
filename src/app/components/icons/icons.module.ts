import { NgModule } from "@angular/core";
import { PageIconsComponent } from "./page-icons.component";
import { CommonModule } from "@angular/common";
import { KoalaFolderPageModule } from "@koalarx/ui/folder-page";
import { KoalaFormModule } from "@koalarx/ui/form";
import { KoalaIconModule } from "@koalarx/ui/icon";
import { MatLegacyButtonModule as MatButtonModule } from "@angular/material/legacy-button";
import { MatLegacyTooltipModule as MatTooltipModule } from "@angular/material/legacy-tooltip";
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
