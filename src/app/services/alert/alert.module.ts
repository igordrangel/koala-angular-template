import { NgModule } from "@angular/core";
import { PageAlertComponent } from "./page-alert.component";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { MatExpansionModule } from "@angular/material/expansion";
import { AlertRoutingModule } from "./alert.routing.module";
import { KoalaAlertModule } from "@koalarx/ui/alert";
import { KoalaDialogModule } from "@koalarx/ui/dialog";
import { KoalaButtonModule } from "@koalarx/ui/button";
import { KoalaFolderPageModule } from "@koalarx/ui/folder-page";

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
