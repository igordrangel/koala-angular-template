import { NgModule } from "@angular/core";
import { CrudPageExampleRoutingModule } from "./crud-page-example.routing.module";
import { CommonModule } from "@angular/common";
import { KoalaFolderPageModule } from "@koalarx/ui/folder-page";
import { CrudPageExampleComponent } from "./crud-page-example.component";
import { KoalaButtonModule } from "@koalarx/ui/button";
import { KoalaDialogModule } from "@koalarx/ui/dialog";
import { DialogFormItemComponent } from "./dialog/dialog-form-item.component";
import { KoalaFormModule } from "@koalarx/ui/form";
import { KoalaAlertModule } from "@koalarx/ui/alert";
import { KoalaQuestionModule } from "@koalarx/ui/question";
import { KoalaListModule } from "@koalarx/ui/list";
import { KoalaSnackbarModule } from "@koalarx/ui/snackbar";

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
