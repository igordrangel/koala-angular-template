import { NgModule } from "@angular/core";
import { PageAlertComponent } from "./page-alert.component";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { MatExpansionModule } from "@angular/material/expansion";
import { AlertRoutingModule } from "./alert.routing.module";
import { KoalaFolderPageModule } from "../../../../../ngx-koala/src/lib/shared/components/folder-page/koala.folder-page.module";
import { KoalaDialogModule } from "../../../../../ngx-koala/src/lib/shared/components/dialog/koala.dialog.module";
import { KoalaButtonModule } from "../../../../../ngx-koala/src/lib/shared/components/button/koala.button.module";
import { KoalaAlertModule } from "../../../../../ngx-koala/src/lib/shared/components/alert/koala.alert.module";

@NgModule({
  exports: [
    PageAlertComponent
  ],
  declarations: [
    PageAlertComponent
  ],
  imports: [
    CommonModule,
    KoalaFolderPageModule,
    KoalaButtonModule,
    KoalaDialogModule,
    KoalaAlertModule,
    MatIconModule,
    MatExpansionModule,
    AlertRoutingModule
  ]
})
export class AlertModule {}
