import { Component } from "@angular/core";
import { PageAbstract } from "../../shared/abstract/page.abstract";

@Component({
  templateUrl: 'page-example-crud-page.component.html',
  styleUrls: ['page-example-crud-page.component.css']
})
export class PageExampleCrudPageComponent extends PageAbstract {

  constructor() {
    super();
  }
}
