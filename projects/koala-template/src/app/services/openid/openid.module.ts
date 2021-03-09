import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { KoalaFolderPageModule } from "../../../../../ngx-koala/src/lib/shared/components/folder-page/koala.folder-page.module";
import { PageOpenidComponent } from "./page-openid.component";
import { OpenidRoutingModule } from "./openid.routing.module";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule } from "@angular/material/icon";

@NgModule({
  exports: [
    PageOpenidComponent
  ],
  declarations: [
    PageOpenidComponent
  ],
  imports: [
    CommonModule,
    KoalaFolderPageModule,
    MatExpansionModule,
    MatIconModule,
    OpenidRoutingModule
  ]
})
export class OpenidModule {}
