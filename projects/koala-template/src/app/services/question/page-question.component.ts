import { Component } from "@angular/core";
import { PageAbstract } from "../../shared/abstract/page.abstract";
import { KoalaQuestionService } from "../../../../../ngx-koala/src/question";

@Component({
  templateUrl: 'page-question.component.html'
})
export class PageQuestionComponent extends PageAbstract {

  constructor(private questionService: KoalaQuestionService) {
    super();
  }

  public showQuestion() {
    this.questionService.open({
      message: 'Click yes or no'
    }, () => alert("You click on yes."), () => alert("You click on no."));
  }
}
