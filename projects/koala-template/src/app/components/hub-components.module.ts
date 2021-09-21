import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HubComponentsRoutingModule } from "./hub-components.routing.module";
import { KoalaFolderPageModule } from '../../../../ngx-koala/src/folder-page/koala.folder-page.module';
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
