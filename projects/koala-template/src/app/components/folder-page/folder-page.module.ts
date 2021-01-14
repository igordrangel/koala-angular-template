import { NgModule } from "@angular/core";
import { PageFolderPageComponent } from "./page-folder-page.component";
import { CommonModule } from "@angular/common";
import { KoalaFolderPageModule } from "../../../../../ngx-koala/src/lib/shared/components/folder-page/koala.folder-page.module";
import { FolderPageRoutingModule } from "./folder-page.routing.module";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule } from "@angular/material/icon";

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
    FolderPageRoutingModule
  ]
})
export class FolderPageModule {}
