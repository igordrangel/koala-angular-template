import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { KoalaFolderPageModule } from "@koalarx/ui/folder-page";
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
