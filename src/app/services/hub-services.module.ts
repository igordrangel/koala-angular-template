import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { KoalaFolderPageModule } from "@koalarx/ui/folder-page";
import { HubServicesRoutingModule } from "./hub-services.routing.module";
import { MatLegacyButtonModule as MatButtonModule } from "@angular/material/legacy-button";

@NgModule({
  imports: [
    CommonModule,
    KoalaFolderPageModule,
    MatButtonModule,
    HubServicesRoutingModule
  ]
})
export class HubServicesModule {}
