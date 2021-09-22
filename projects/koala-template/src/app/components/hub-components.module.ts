import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HubComponentsRoutingModule } from "./hub-components.routing.module";
import { KoalaFolderPageModule } from '../../../../folder-page/src/lib/koala.folder-page.module';
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
