import { NgModule } from "@angular/core";
import { PageXlsxComponent } from "./page-xlsx.component";
import { CommonModule } from "@angular/common";
import { KoalaFolderPageModule } from "../../../../../ngx-koala/src/lib/shared/components/folder-page/koala.folder-page.module";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule } from "@angular/material/icon";
import { XlsxRoutingModule } from "./xlsx.routing.module";
import { KoalaButtonModule } from "../../../../../ngx-koala/src/lib/shared/components/button/koala.button.module";

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
