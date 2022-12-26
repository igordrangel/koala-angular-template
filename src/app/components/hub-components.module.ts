import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HubComponentsRoutingModule } from "./hub-components.routing.module";
import { KoalaFolderPageModule } from '@koalarx/ui/folder-page';
import { MatLegacyButtonModule as MatButtonModule } from "@angular/material/legacy-button";

@NgModule({
  imports: [
    CommonModule,
    KoalaFolderPageModule,
    MatButtonModule,
    HubComponentsRoutingModule
  ]
})
export class HubComponentsModule {
}
