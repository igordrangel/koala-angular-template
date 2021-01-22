import { Component } from "@angular/core";
import { koala } from "koala-utils";

interface ItemService {
  name: string;
  routerLink: string;
}

@Component({
  templateUrl: 'page-hub-services.component.html',
  styleUrls: ['page-hub-services.component.css']
})
export class PageHubServicesComponent {
  public services: ItemService[] = koala([
    {name: 'Page Loader', routerLink: '/services/page-loading'},
    {name: 'XLSX', routerLink: '/services/xlsx'},
    {name: 'CSV', routerLink: '/services/csv'},
    {name: 'Alert', routerLink: '/services/alert'},
    {name: 'Question', routerLink: '/services/question'},
    {name: 'Menu', routerLink: '/services/menu'},
    {name: 'Request', routerLink: '/services/request'},
    {name: 'Dynamic Form', routerLink: '/services/dynamic-form'},
    {name: 'Token', routerLink: '/services/token'}
  ]).array<ItemService>().orderBy('name').getValue();
}
