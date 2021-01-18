import { NgModule } from "@angular/core";
import { PageFormsComponent } from "./page-forms.component";
import { CommonModule } from "@angular/common";
import { KoalaFolderPageModule } from "../../../../../ngx-koala/src/lib/shared/components/folder-page/koala.folder-page.module";
import { FormsRoutingModule } from "./forms.routing.module";
import { KoalaFormModule } from "../../../../../ngx-koala/src/lib/shared/components/form/koala.form.module";
import { MatExpansionModule } from "@angular/material/expansion";

@NgModule({
  exports: [
    PageFormsComponent
  ],
  declarations: [
    PageFormsComponent
  ],
  imports: [
    CommonModule,
    KoalaFolderPageModule,
    KoalaFormModule,
    MatExpansionModule,
    FormsRoutingModule
  ]
})
export class FormsModule {}
