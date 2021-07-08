import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HubGuidesRoutingModule } from "./hub-guides.routing.module";
import { KoalaFolderPageModule } from "../../../../ngx-koala/src/lib/shared/components/folder-page/koala.folder-page.module";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  imports: [
    CommonModule,
    KoalaFolderPageModule,
    MatButtonModule,
    HubGuidesRoutingModule
  ]
})
export class HubGuidesModule {}
