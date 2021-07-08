import { ChangeDetectionStrategy, Component } from '@angular/core';
import { KoalaPagePalletColorsInterface } from '../../../ngx-koala/src/lib/shared/components/page/koala-page-pallet-colors.interface';
import { KoalaTheme } from "./shared/helpers/theme";
import { KoalaOauth2ConfigInterface } from "../../../ngx-koala/src/lib/shared/components/page/koala-oauth2-config.interface";
import { KoalaMenuModuleInterface } from "../../../ngx-koala/src/lib/shared/components/menu/koala.menu-module.interface";
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
  public oauth2Config: KoalaOauth2ConfigInterface = {
    customQueryParams: {
      client_secret: 't1gbmEgh4EUgAJRLy16Zjrks'
    },
    clientId: '679440572859-iviegii370t3n4m15qrpr4fpj4db8jc7.apps.googleusercontent.com',
    scope: 'openid profile email',
    domain: 'https://accounts.google.com',
    strictDiscoveryDocumentValidation: false,
    indexLoginName: 'name'
  }
  public menuOptions$ = new BehaviorSubject<KoalaMenuModuleInterface[]>([{
    icon: 'get_app',
    name: 'Get Started',
    routerLink: '/get-started'
  },{
    icon: 'menu_book',
    name: 'Guides',
    tools: [{
      name: 'CRUD Page',
      routerLink: '/guides/crud-page'
    }]
  },{
    icon: 'webComponents',
    koalaIcon: true,
    name: 'Components',
    tools: [{
      name: 'Button',
      routerLink: '/components/button'
    },{
      name: 'Dialog',
      routerLink: '/components/dialog'
    },{
      name: 'File Button',
      routerLink: '/components/file-button'
    },{
      name: 'Folder Page',
      routerLink: '/components/folder-page'
    },{
      name: 'Form',
      routerLink: '/components/dynamic-form'
    },{
      name: 'Icons',
      routerLink: '/components/icons'
    },{
      name: 'Icons Animated',
      routerLink: '/components/icons-animated'
    },{
      name: 'List',
      routerLink: '/components/list'
    }]
  },{
    icon: 'deliveryBox',
    koalaIcon: true,
    name: 'Services',
    tools: [{
      name: 'Alert',
      routerLink: '/services/alert'
    },{
      name: 'CSV',
      routerLink: '/services/csv'
    },{
      name: 'Menu',
      routerLink: '/services/menu'
    },{
      name: 'OpenID',
      routerLink: '/services/oauth2'
    },{
      name: 'Page Loader',
      routerLink: '/services/page-loading'
    },{
      name: 'Question',
      routerLink: '/services/question'
    },{
      name: 'Request',
      routerLink: '/services/request'
    },{
      name: 'Token',
      routerLink: '/services/token'
    },{
      name: 'XLSX',
      routerLink: '/services/xlsx'
    }]
  }]);
}
