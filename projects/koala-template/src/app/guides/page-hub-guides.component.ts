import { Component } from "@angular/core";
import { koala } from "koala-utils";

interface ItemGuide {
  name: string;
  routerLink: string;
}

@Component({
  templateUrl: 'page-hub-guides.component.html',
  styleUrls: ['page-hub-guides.component.css']
})
export class PageHubGuidesComponent {
  public guides: ItemGuide[] = koala([
    {name: 'Making a Crud Page', routerLink: '/guides/crud-page'}
  ]).array<ItemGuide>().orderBy('name').getValue()
}
