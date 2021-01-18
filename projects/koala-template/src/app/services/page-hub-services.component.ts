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
    {name: 'Page Loader', routerLink: '/services/page-loader'}
  ]).array<ItemService>().orderBy('name').getValue();
}
