import { NgModule } from "@angular/core";
import { PageQuestionComponent } from "./page-question.component";
import { CommonModule } from "@angular/common";
import { KoalaFolderPageModule } from "../../../../../ngx-koala/src/lib/shared/components/folder-page/koala.folder-page.module";
import { KoalaButtonModule } from "../../../../../ngx-koala/src/lib/shared/components/button/koala.button.module";
import { KoalaDialogModule } from "../../../../../ngx-koala/src/lib/shared/components/dialog/koala.dialog.module";
import { MatIconModule } from "@angular/material/icon";
import { MatExpansionModule } from "@angular/material/expansion";
import { QuestionRoutingModule } from "./question.routing.module";
import { KoalaQuestionModule } from "../../../../../ngx-koala/src/lib/shared/components/question/koala.question.module";

@NgModule({
  exports: [
    PageQuestionComponent
  ],
  declarations: [
    PageQuestionComponent
  ],
  imports: [
    CommonModule,
    KoalaFolderPageModule,
    KoalaButtonModule,
    KoalaDialogModule,
    KoalaQuestionModule,
    MatIconModule,
    MatExpansionModule,
    QuestionRoutingModule
  ]
})
export class QuestionModule {}
