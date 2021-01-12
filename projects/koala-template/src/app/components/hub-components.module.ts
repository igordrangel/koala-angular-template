import {NgModule} from "@angular/core";
import {PageHubComponentsComponent} from "./page-hub-components.component";
import {CommonModule} from "@angular/common";
import {KoalaFolderPageModule} from "ngx-koala";
import {HubComponentsRoutingModule} from "./hub-components.routing.module";

@NgModule({
  exports: [
    PageHubComponentsComponent
  ],
  declarations: [
    PageHubComponentsComponent
  ],
  imports: [
    CommonModule,
    KoalaFolderPageModule,
    HubComponentsRoutingModule
  ]
})
export class HubComponentsModule {}
