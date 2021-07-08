import { NgModule } from "@angular/core";
import { PageButtonComponent } from "./page-button.component";
import { CommonModule } from "@angular/common";
import { MatExpansionModule } from "@angular/material/expansion";
import { ButtonRoutingModule } from "./button.routing.module";
import { MatIconModule } from "@angular/material/icon";
import { KoalaFolderPageModule } from "../../../../../ngx-koala/src/lib/shared/components/folder-page/koala.folder-page.module";
import { KoalaButtonModule } from "../../../../../ngx-koala/src/lib/shared/components/button/koala.button.module";
import { MatTabsModule } from "@angular/material/tabs";

@NgModule({
  exports: [
    PageButtonComponent
  ],
  declarations: [
    PageButtonComponent
  ],
  imports: [
    CommonModule,
    KoalaFolderPageModule,
    KoalaButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatTabsModule,
    ButtonRoutingModule
  ]
})
export class ButtonModule {}
