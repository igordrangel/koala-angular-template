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
    {name: 'Folder Page', routerLink: '/components/folder-page'},
    {name: 'Dialog', routerLink: '/components/dialog'},
    {name: 'Button', routerLink: '/components/button'},
    {name: 'List', routerLink: '/components/list'},
    {name: 'File Button', routerLink: '/components/file-button'},
    {name: 'Dynamic Form', routerLink: '/components/dynamic-form'}
  ]).array<ItemComponent>().orderBy('name').getValue()
}
