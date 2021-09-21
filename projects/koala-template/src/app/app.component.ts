import { ChangeDetectionStrategy, Component } from '@angular/core';
import { KoalaPagePalletColorsInterface } from '../../../ngx-koala/src/core/page/koala-page-pallet-colors.interface';
import { KoalaTheme } from "./shared/helpers/theme";
import { KoalaMenuModuleInterface } from "../../../ngx-koala/src/menu";
import { BehaviorSubject } from "rxjs";

declare namespace NodeJS {
  interface TypedArray {

  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  public openPages = ['/login'];
  public palletCollors: KoalaPagePalletColorsInterface = KoalaTheme;
  public menuOptions$ = new BehaviorSubject<KoalaMenuModuleInterface[]>([{
    icon: 'get_app',
    name: 'Get Started',
    routerLink: '/get-started'
  }, {
    icon: 'menu_book',
    name: 'Guides',
    tools: [{
      name: 'CRUD Page',
      routerLink: '/guides/crud-page'
    }]
  }, {
    icon: 'webComponents',
    koalaIcon: true,
    name: 'Components',
    tools: [{
      name: 'Button',
      routerLink: '/components/button'
    }, {
      name: 'Dialog',
      routerLink: '/components/dialog'
    }, {
      name: 'File Button',
      routerLink: '/components/file-button'
    }, {
      name: 'Folder Page',
      routerLink: '/components/folder-page'
    }, {
      name: 'Form',
      routerLink: '/components/dynamic-form'
    }, {
      name: 'Icons',
      routerLink: '/components/icons'
    }, {
      name: 'Icons Animated',
      routerLink: '/components/icons-animated'
    }, {
      name: 'List',
      routerLink: '/components/list'
    }]
  }, {
    icon: 'deliveryBox',
    koalaIcon: true,
    name: 'Services',
    tools: [{
      name: 'Alert',
      routerLink: '/services/alert'
    }, {
      name: 'CSV',
      routerLink: '/services/csv'
    }, {
      name: 'Menu',
      routerLink: '/services/menu'
    }, {
      name: 'OpenID',
      routerLink: '/services/oauth2'
    }, {
      name: 'Page Loader',
      routerLink: '/services/page-loading'
    }, {
      name: 'Question',
      routerLink: '/services/question'
    }, {
      name: 'Request',
      routerLink: '/services/request'
    }, {
      name: 'Snackbar',
      routerLink: '/services/snackbar'
    }, {
      name: 'Token',
      routerLink: '/services/token'
    }, {
      name: 'XLSX',
      routerLink: '/services/xlsx'
    }]
  }]);
  public validatingScope$ = new BehaviorSubject<boolean>(false);
}
