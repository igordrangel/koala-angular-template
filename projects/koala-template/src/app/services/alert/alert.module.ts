import { NgModule } from "@angular/core";
import { PageAlertComponent } from "./page-alert.component";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { MatExpansionModule } from "@angular/material/expansion";
import { AlertRoutingModule } from "./alert.routing.module";
import { KoalaFolderPageModule } from "../../../../../ngx-koala/src/folder-page";
import { KoalaDialogModule } from "../../../../../ngx-koala/src/dialog";
import { KoalaButtonModule } from "../../../../../ngx-koala/src/button";
import { KoalaAlertModule } from "../../../../../../dist/ngx-koala/alert";

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
