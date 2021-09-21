import { NgModule } from "@angular/core";
import { PageQuestionComponent } from "./page-question.component";
import { CommonModule } from "@angular/common";
import { KoalaFolderPageModule } from "../../../../../ngx-koala/src/folder-page";
import { KoalaButtonModule } from "../../../../../ngx-koala/src/button";
import { KoalaDialogModule } from "../../../../../ngx-koala/src/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatExpansionModule } from "@angular/material/expansion";
import { QuestionRoutingModule } from "./question.routing.module";
import { KoalaQuestionModule } from "../../../../../ngx-koala/src/question";

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
