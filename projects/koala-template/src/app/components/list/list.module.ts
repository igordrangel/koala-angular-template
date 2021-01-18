import { NgModule } from "@angular/core";
import { PageListComponent } from "./page-list.component";
import { CommonModule } from "@angular/common";
import { ListRoutingModule } from "./list.routing.module";
import { KoalaFolderPageModule } from "../../../../../ngx-koala/src/lib/shared/components/folder-page/koala.folder-page.module";
import { KoalaListModule } from "../../../../../ngx-koala/src/lib/shared/components/list/koala.list.module";
import { EmptyListComponent } from "./empty-list/empty-list.component";
import { KoalaIconModule } from "../../../../../ngx-koala/src/lib/shared/components/icon/koala.icon.module";
import { KoalaButtonModule } from "../../../../../ngx-koala/src/lib/shared/components/button/koala.button.module";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule } from "@angular/material/icon";
import { KoalaAlertService } from "../../../../../ngx-koala/src/lib/shared/services/alert/koala.alert.service";

@NgModule({
  exports: [
    PageListComponent
  ],
  declarations: [
    PageListComponent,
    EmptyListComponent
  ],
  imports: [
    CommonModule,
    KoalaFolderPageModule,
    KoalaListModule,
    KoalaButtonModule,
    KoalaIconModule,
    MatExpansionModule,
    MatIconModule,
    ListRoutingModule
  ],
  providers: [
    KoalaAlertService
  ]
})
export class ListModule {}
