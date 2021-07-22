import { NgModule } from "@angular/core";
import { CrudPageExampleRoutingModule } from "./crud-page-example.routing.module";
import { CommonModule } from "@angular/common";
import { KoalaFolderPageModule } from "../../../../../../ngx-koala/src/lib/shared/components/folder-page/koala.folder-page.module";
import { CrudPageExampleComponent } from "./crud-page-example.component";
import { KoalaButtonModule } from "../../../../../../ngx-koala/src/lib/shared/components/button/koala.button.module";
import { KoalaDialogModule } from "../../../../../../ngx-koala/src/lib/shared/components/dialog/koala.dialog.module";
import { KoalaAlertModule } from "../../../../../../ngx-koala/src/lib/shared/components/alert/koala.alert.module";
import { KoalaQuestionModule } from "../../../../../../ngx-koala/src/lib/shared/components/question/koala.question.module";
import { KoalaListModule } from "../../../../../../ngx-koala/src/lib/shared/components/list/koala.list.module";
import { DialogFormItemComponent } from "./dialog/dialog-form-item.component";
import { KoalaFormModule } from "../../../../../../ngx-koala/src/lib/shared/components/form/koala.form.module";
import { KoalaSnackbarModule } from "../../../../../../ngx-koala/src/lib/shared/components/snackbar/koala.snackbar.module";

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
