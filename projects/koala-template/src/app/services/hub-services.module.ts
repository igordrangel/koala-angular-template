import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { KoalaFolderPageModule } from "../../../../ngx-koala/src/folder-page";
import { HubServicesRoutingModule } from "./hub-services.routing.module";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  imports: [
    CommonModule,
    KoalaFolderPageModule,
    MatButtonModule,
    HubServicesRoutingModule
  ]
})
export class HubServicesModule {}
