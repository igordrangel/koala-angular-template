import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule } from "@angular/material/icon";
import { CsvRoutingModule } from "./csv.routing.module";
import { PageCsvComponent } from "./page-csv.component";
import { KoalaButtonModule } from "@koalarx/ui/button";
import { KoalaFolderPageModule } from "@koalarx/ui/folder-page";

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
