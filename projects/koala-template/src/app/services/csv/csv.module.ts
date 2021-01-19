import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { KoalaFolderPageModule } from "../../../../../ngx-koala/src/lib/shared/components/folder-page/koala.folder-page.module";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule } from "@angular/material/icon";
import { CsvRoutingModule } from "./csv.routing.module";
import { KoalaButtonModule } from "../../../../../ngx-koala/src/lib/shared/components/button/koala.button.module";
import { PageCsvComponent } from "./page-csv.component";

@NgModule({
  exports: [
    PageCsvComponent
  ],
  declarations: [
    PageCsvComponent
  ],
  imports: [
    CommonModule,
    KoalaFolderPageModule,
    KoalaButtonModule,
    MatExpansionModule,
    MatIconModule,
    CsvRoutingModule
  ]
})
export class CsvModule {}
