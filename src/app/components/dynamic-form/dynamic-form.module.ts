import { NgModule } from "@angular/core";
import { PageDynamicFormComponent } from "./page-dynamic-form.component";
import { CommonModule } from "@angular/common";
import { KoalaFolderPageModule } from "@koalarx/ui/folder-page";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule } from "@angular/material/icon";
import { DynamicFormRoutingModule } from "./dynamic-form.routing.module";
import { KoalaFormModule } from "@koalarx/ui/form";
import { MatLegacyTabsModule as MatTabsModule } from "@angular/material/legacy-tabs";
import { KoalaButtonModule } from "@koalarx/ui/button";

@NgModule({
  exports: [
    PageDynamicFormComponent
  ],
  declarations: [
    PageDynamicFormComponent
  ],
  imports: [
    CommonModule,
    KoalaFolderPageModule,
    KoalaFormModule,
    KoalaButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatTabsModule,
    DynamicFormRoutingModule
  ]
})
export class DynamicFormModule {}
