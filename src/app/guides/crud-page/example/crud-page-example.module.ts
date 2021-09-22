import { NgModule } from "@angular/core";
import { CrudPageExampleRoutingModule } from "./crud-page-example.routing.module";
import { CommonModule } from "@angular/common";
import { KoalaFolderPageModule } from "../../../../../../ngx-koala/src/folder-page";
import { CrudPageExampleComponent } from "./crud-page-example.component";
import { KoalaButtonModule } from "../../../../../../ngx-koala/src/button";
import { KoalaDialogModule } from "../../../../../../ngx-koala/src/dialog";
import { KoalaAlertModule } from "../../../../../../ngx-koala/src/alert";
import { KoalaQuestionModule } from "../../../../../../ngx-koala/src/question";
import { KoalaListModule } from "../../../../../../ngx-koala/src/list";
import { DialogFormItemComponent } from "./dialog/dialog-form-item.component";
import { KoalaFormModule } from "../../../../../../ngx-koala/src/form";
import { KoalaSnackbarModule } from "../../../../../../ngx-koala/src/snackbar";

@NgModule({
  exports: [
    CrudPageExampleComponent
  ],
  declarations: [
    CrudPageExampleComponent,
    DialogFormItemComponent
  ],
  imports: [
    CommonModule,
    KoalaFolderPageModule,
    KoalaButtonModule,
    KoalaFormModule,
    KoalaDialogModule,
    KoalaAlertModule,
    KoalaQuestionModule,
    KoalaListModule,
    KoalaSnackbarModule,
    CrudPageExampleRoutingModule
  ]
})
export class CrudPageExampleModule {}
