import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HubGuidesRoutingModule } from "./hub-guides.routing.module";
import { KoalaFolderPageModule } from "@koalarx/ui/folder-page";
import { MatLegacyButtonModule as MatButtonModule } from "@angular/material/legacy-button";

@NgModule({
  imports: [
    CommonModule,
    KoalaFolderPageModule,
    MatButtonModule,
    HubGuidesRoutingModule
  ]
})
export class HubGuidesModule {}
