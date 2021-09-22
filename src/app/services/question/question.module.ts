import { NgModule } from "@angular/core";
import { PageQuestionComponent } from "./page-question.component";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { MatExpansionModule } from "@angular/material/expansion";
import { QuestionRoutingModule } from "./question.routing.module";
import { KoalaQuestionModule } from "@koalarx/ui/question";
import { KoalaDialogModule } from "@koalarx/ui/dialog";
import { KoalaButtonModule } from "@koalarx/ui/button";
import { KoalaFolderPageModule } from "@koalarx/ui/folder-page";

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
