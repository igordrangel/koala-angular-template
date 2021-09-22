import { NgModule } from "@angular/core";
import { PageXlsxComponent } from "./page-xlsx.component";
import { CommonModule } from "@angular/common";
import { KoalaFolderPageModule } from "@koalarx/ui/folder-page";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule } from "@angular/material/icon";
import { XlsxRoutingModule } from "./xlsx.routing.module";
import { KoalaButtonModule } from "@koalarx/ui/button";

@NgModule({
  exports: [
    PageXlsxComponent
  ],
  declarations: [
    PageXlsxComponent
  ],
  imports: [
    CommonModule,
    KoalaFolderPageModule,
    KoalaButtonModule,
    MatExpansionModule,
    MatIconModule,
    XlsxRoutingModule
  ]
})
export class XlsxModule {}
