import { Component } from "@angular/core";
import { PageAbstract } from "../../shared/abstract/page.abstract";
import { KoalaMenuService } from "../../../../../ngx-koala/src/lib/shared/services/menu/koala.menu.service";

@Component({
  templateUrl: 'page-menu.component.html'
})
export class PageMenuComponent extends PageAbstract {

  constructor(private menuService: KoalaMenuService) {
    super();
  }

  public collapse() {
    if (this.menuService.getMenuState() === 'open') {
      this.menuService.close();
    } else {
      this.menuService.open();
    }
  }
}
