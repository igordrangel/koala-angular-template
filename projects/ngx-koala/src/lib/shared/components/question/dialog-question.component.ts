import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  templateUrl: 'dialog-question.component.html',
  styleUrls: ['dialog-question.component.css']
})
export class DialogQuestionComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public message) {
  }
}