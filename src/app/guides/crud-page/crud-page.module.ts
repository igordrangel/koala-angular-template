import { NgModule } from "@angular/core";
import { PageExampleCrudPageComponent } from "./page-example-crud-page.component";
import { CommonModule } from "@angular/common";
import { CrudPageRoutingModule } from "./crud-page.routing.module";
import { KoalaFolderPageModule } from "../../../../../ngx-koala/src/folder-page";
import { MatStepperModule } from "@angular/material/stepper";

@NgModule({
  exports: [
    PageExampleCrudPageComponent
  ],
  declarations: [
    PageExampleCrudPageComponent
  ],
  imports: [
    CommonModule,
    KoalaFolderPageModule,
    MatStepperModule,
    CrudPageRoutingModule
  ]
})
export class CrudPageModule {}
