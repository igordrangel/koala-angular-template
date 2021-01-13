import { NgModule } from "@angular/core";
import { PageHubComponentsComponent } from "./page-hub-components.component";
import { CommonModule } from "@angular/common";
import { HubComponentsRoutingModule } from "./hub-components.routing.module";
import { PageIconsComponent } from "./icons/page-icons.component";
import { MatButtonModule } from "@angular/material/button";
import { KoalaFolderPageModule } from '../../../../ngx-koala/src/lib/shared/components/folder-page/koala.folder-page.module';
import { KoalaIconModule } from "../../../../ngx-koala/src/lib/shared/components/icon/koala.icon.module";
import { KoalaFormModule } from "../../../../ngx-koala/src/lib/shared/components/form/koala.form.module";

@NgModule({
  exports: [
    PageHubComponentsComponent
  ],
  declarations: [
    PageHubComponentsComponent,
    PageIconsComponent
  ],
  imports: [
    CommonModule,
    KoalaFolderPageModule,
    KoalaFormModule,
    KoalaIconModule,
    MatButtonModule,
    HubComponentsRoutingModule
  ]
})
export class HubComponentsModule {
}
