import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PageQuestionComponent } from "./page-question.component";

const routes: Routes = [
  {path: '', component: PageQuestionComponent}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionRoutingModule {}
