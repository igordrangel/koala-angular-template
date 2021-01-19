import { NgModule } from "@angular/core";
import { PageTokenComponent } from "./page-token.component";
import { CommonModule } from "@angular/common";
import { KoalaFolderPageModule } from "../../../../../ngx-koala/src/lib/shared/components/folder-page/koala.folder-page.module";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule } from "@angular/material/icon";
import { TokenRoutingModule } from "./token.routing.module";

@NgModule({
  exports: [
    PageTokenComponent
  ],
  declarations: [
    PageTokenComponent
  ],
  imports: [
    CommonModule,
    KoalaFolderPageModule,
    MatExpansionModule,
    MatIconModule,
    TokenRoutingModule
  ]
})
export class TokenModule {}
