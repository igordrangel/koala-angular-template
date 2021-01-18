import { NgModule } from "@angular/core";
import { PagePageLoaderComponent } from "./page-page-loader.component";
import { CommonModule } from "@angular/common";
import { KoalaFolderPageModule } from "../../../../../ngx-koala/src/lib/shared/components/folder-page/koala.folder-page.module";
import { PageLoaderRoutingModule } from "./page-loader.routing.module";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule } from "@angular/material/icon";
import { KoalaButtonModule } from "../../../../../ngx-koala/src/lib/shared/components/button/koala.button.module";

@NgModule({
  exports: [
    PagePageLoaderComponent
  ],
  declarations: [
    PagePageLoaderComponent
  ],
  imports: [
    CommonModule,
    KoalaFolderPageModule,
    KoalaButtonModule,
    MatExpansionModule,
    MatIconModule,
    PageLoaderRoutingModule
  ]
})
export class PageLoaderModule {}
