import { NgModule } from "@angular/core";
import { PageRequestComponent } from "./page-request.component";
import { CommonModule } from "@angular/common";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule } from "@angular/material/icon";
import { RequestRoutingModule } from "./request.routing.module";
import { KoalaDialogModule } from "@koalarx/ui/dialog";
import { KoalaButtonModule } from "@koalarx/ui/button";
import { KoalaFolderPageModule } from "@koalarx/ui/folder-page";

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
