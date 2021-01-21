import { NgModule } from "@angular/core";
import { PageDynamicFormComponent } from "./page-dynamic-form.component";
import { CommonModule } from "@angular/common";
import { KoalaFolderPageModule } from "../../../../../ngx-koala/src/lib/shared/components/folder-page/koala.folder-page.module";
import { DynamicFormRoutingModule } from "./dynamic-form.routing.module";
import { KoalaFormModule } from "../../../../../ngx-koala/src/lib/shared/components/form/koala.form.module";
import { MatExpansionModule } from "@angular/material/expansion";

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
    MatExpansionModule,
    DynamicFormRoutingModule
  ]
})
export class DynamicFormModule {}