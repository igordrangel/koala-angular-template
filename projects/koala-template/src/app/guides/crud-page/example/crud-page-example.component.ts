import { Component } from "@angular/core";
import { KoalaNavigateHistoryInterface } from "../../../../../../ngx-koala/src/lib/shared/components/folder-page/koala-navigate-history.interface";

@Component({
  templateUrl: 'crud-page-example.component.html'
})
export class CrudPageExampleComponent {
  public navigateHistory: KoalaNavigateHistoryInterface[] = [
    {name: 'Guides', routerLink: '/guides'},
    {name: 'Crud Page', routerLink: '/guides/crud-page'},
    {name: 'Example'}
  ]
}
