import { NgModule } from "@angular/core";
import { PageDynamicFormComponent } from "./page-dynamic-form.component";
import { CommonModule } from "@angular/common";
import { KoalaFolderPageModule } from "../../../../../ngx-koala/src/folder-page";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule } from "@angular/material/icon";
import { DynamicFormRoutingModule } from "./dynamic-form.routing.module";
import { KoalaFormModule } from "../../../../../ngx-koala/src/form";
import { MatTabsModule } from "@angular/material/tabs";
import { KoalaButtonModule } from "../../../../../ngx-koala/src/button";

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
