import { NgModule } from "@angular/core";
import { PageListComponent } from "./page-list.component";
import { CommonModule } from "@angular/common";
import { ListRoutingModule } from "./list.routing.module";
import { KoalaFolderPageModule } from "@koalarx/ui/folder-page";
import { KoalaListModule } from "@koalarx/ui/list";
import { EmptyListComponent } from "./empty-list/empty-list.component";
import { KoalaIconModule } from "@koalarx/ui/icon";
import { KoalaButtonModule } from "@koalarx/ui/button";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule } from "@angular/material/icon";
import { KoalaAlertModule } from "@koalarx/ui/alert";
import { ErrorListComponent } from "./error-list/error-list.component";
import { MatLegacyTabsModule as MatTabsModule } from "@angular/material/legacy-tabs";

@NgModule({
  exports: [
    PageListComponent
  ],
  declarations: [
    PageListComponent,
    EmptyListComponent,
    ErrorListComponent
  ],
  imports: [
    CommonModule,
    KoalaFolderPageModule,
    KoalaListModule,
    KoalaAlertModule,
    KoalaButtonModule,
    KoalaIconModule,
    MatExpansionModule,
    MatIconModule,
    MatTabsModule,
    ListRoutingModule
  ]
})
export class ListModule {
}
