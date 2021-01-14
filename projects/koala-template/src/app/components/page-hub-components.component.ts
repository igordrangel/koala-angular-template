import {Component} from "@angular/core";
import { koala } from "koala-utils";

interface ItemComponent {
  name: string;
  routerLink: string;
}

@Component({
  templateUrl: 'page-hub-components.component.html',
  styleUrls: ['page-hub-components.component.css']
})
export class PageHubComponentsComponent {
  public components: ItemComponent[] = koala([
    {name: 'Icons', routerLink: '/components/icons'},
    {name: 'Folder Page', routerLink: '/components/folder-page'}
  ]).array<ItemComponent>().orderBy('name').getValue()
}
