import { NgModule } from "@angular/core";
import { PageListComponent } from "./page-list.component";
import { CommonModule } from "@angular/common";
import { ListRoutingModule } from "./list.routing.module";
import { KoalaFolderPageModule } from "../../../../../ngx-koala/src/folder-page";
import { KoalaListModule } from "../../../../../ngx-koala/src/list";
import { EmptyListComponent } from "./empty-list/empty-list.component";
import { KoalaIconModule } from "../../../../../ngx-koala/src/icon";
import { KoalaButtonModule } from "../../../../../ngx-koala/src/button";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule } from "@angular/material/icon";
import { KoalaAlertModule } from "../../../../../ngx-koala/src/alert";
import { ErrorListComponent } from "./error-list/error-list.component";

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
    ListRoutingModule
  ]
})
export class ListModule {}
