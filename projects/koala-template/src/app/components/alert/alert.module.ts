import { NgModule } from "@angular/core";
import { PageAlertComponent } from "./page-alert.component";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { MatExpansionModule } from "@angular/material/expansion";
import { AlertRoutingModule } from "./alert.routing.module";
import { KoalaFolderPageModule } from "../../../../../ngx-koala/src/lib/shared/components/folder-page/koala.folder-page.module";
import { KoalaDialogModule } from "../../../../../ngx-koala/src/lib/shared/components/dialog/koala.dialog.module";
import { KoalaButtonModule } from "../../../../../ngx-koala/src/lib/shared/components/button/koala.button.module";
import { KoalaAlertService } from "../../../../../ngx-koala/src/lib/shared/services/alert/koala.alert.service";
import { KoalaDialogService } from "../../../../../ngx-koala/src/lib/shared/services/dialog/koala.dialog.service";

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
    MatIconModule,
    MatExpansionModule,
    AlertRoutingModule
  ],
  providers: [
    KoalaAlertService,
    KoalaDialogService
  ]
})
export class AlertModule {}
