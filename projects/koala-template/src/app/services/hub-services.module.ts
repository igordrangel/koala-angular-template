import { NgModule } from "@angular/core";
import { PageHubServicesComponent } from "./page-hub-services.component";
import { CommonModule } from "@angular/common";
import { KoalaFolderPageModule } from "../../../../ngx-koala/src/lib/shared/components/folder-page/koala.folder-page.module";
import { HubServicesRoutingModule } from "./hub-services.routing.module";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  exports: [
    PageHubServicesComponent
  ],
  declarations: [
    PageHubServicesComponent
  ],
  imports: [
    CommonModule,
    KoalaFolderPageModule,
    MatButtonModule,
    HubServicesRoutingModule
  ]
})
export class HubServicesModule {}
