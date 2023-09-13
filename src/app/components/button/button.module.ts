import { NgModule } from "@angular/core";
import { PageButtonComponent } from "./page-button.component";
import { CommonModule } from "@angular/common";
import { MatExpansionModule } from "@angular/material/expansion";
import { ButtonRoutingModule } from "./button.routing.module";
import { MatIconModule } from "@angular/material/icon";
import { KoalaFolderPageModule } from "@koalarx/ui/folder-page";
import { KoalaButtonModule } from "@koalarx/ui/button";
import { MatLegacyTabsModule as MatTabsModule } from "@angular/material/legacy-tabs";

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
