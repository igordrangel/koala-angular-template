import { Component } from "@angular/core";
import { PageAbstract } from "../../shared/abstract/page.abstract";
import { KoalaDynamicFormService } from "../../../../../ngx-koala/src/lib/shared/services/dynamic-forms/koala.dynamic-form.service";

@Component({
  templateUrl: 'page-dynamic-form.component.html',
  styleUrls: ['page-dynamic-form.component.css']
})
export class PageDynamicFormComponent extends PageAbstract {

  constructor(private dynamicFormService: KoalaDynamicFormService) {
    super();
  }
}
