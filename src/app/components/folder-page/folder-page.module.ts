import { NgModule } from "@angular/core";
import { PageFolderPageComponent } from "./page-folder-page.component";
import { CommonModule } from "@angular/common";
import { KoalaFolderPageModule } from "@koalarx/ui/folder-page";
import { FolderPageRoutingModule } from "./folder-page.routing.module";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule } from "@angular/material/icon";
import { MatLegacyTabsModule as MatTabsModule } from "@angular/material/legacy-tabs";

@NgModule({
  exports: [
    PageFolderPageComponent
  ],
  declarations: [
    PageFolderPageComponent
  ],
  imports: [
    CommonModule,
    KoalaFolderPageModule,
    MatExpansionModule,
    MatIconModule,
    MatTabsModule,
    FolderPageRoutingModule
  ]
})
export class FolderPageModule {}
