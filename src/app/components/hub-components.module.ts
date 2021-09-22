import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HubComponentsRoutingModule } from "./hub-components.routing.module";
import { KoalaFolderPageModule } from '@koalarx/ui/folder-page';
import { MatButtonModule } from "@angular/material/button";

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
