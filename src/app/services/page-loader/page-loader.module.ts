import { NgModule } from "@angular/core";
import { PagePageLoaderComponent } from "./page-page-loader.component";
import { CommonModule } from "@angular/common";
import { PageLoaderRoutingModule } from "./page-loader.routing.module";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule } from "@angular/material/icon";
import { KoalaButtonModule } from "@koalarx/ui/button";
import { KoalaFolderPageModule } from "@koalarx/ui/folder-page";

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
