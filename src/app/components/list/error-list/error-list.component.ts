import { Component } from "@angular/core";
import { KoalaDynamicComponentComponent } from "@koalarx/ui/dynamic-component";

@Component({
  templateUrl: 'error-list.component.html',
  styleUrls: ['error-list.component.css']
})
export class ErrorListComponent implements KoalaDynamicComponentComponent {
  public data: Error;
}
