import { Component } from "@angular/core";
import { KoalaDynamicComponentComponent } from "../../../../../../ngx-koala/src/lib/shared/components/dynamic-component/koala-dynamic-component.component";

@Component({
  templateUrl: 'error-list.component.html',
  styleUrls: ['error-list.component.css']
})
export class ErrorListComponent implements KoalaDynamicComponentComponent {
  public data: Error;
}
