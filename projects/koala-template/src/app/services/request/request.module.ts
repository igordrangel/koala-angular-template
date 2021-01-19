import { NgModule } from "@angular/core";
import { PageRequestComponent } from "./page-request.component";
import { CommonModule } from "@angular/common";
import { KoalaFolderPageModule } from "../../../../../ngx-koala/src/lib/shared/components/folder-page/koala.folder-page.module";
import { KoalaButtonModule } from "../../../../../ngx-koala/src/lib/shared/components/button/koala.button.module";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule } from "@angular/material/icon";
import { RequestRoutingModule } from "./request.routing.module";
import { KoalaDialogModule } from "../../../../../ngx-koala/src/lib/shared/components/dialog/koala.dialog.module";

@NgModule({
  exports: [
    PageRequestComponent
  ],
  declarations: [
    PageRequestComponent
  ],
  imports: [
    CommonModule,
    KoalaFolderPageModule,
    KoalaButtonModule,
    KoalaDialogModule,
    MatExpansionModule,
    MatIconModule,
    RequestRoutingModule
  ]
})
export class RequestModule {}
