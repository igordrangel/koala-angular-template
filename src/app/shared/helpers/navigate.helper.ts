import { KoalaNavigateHistoryInterface } from "@koalarx/ui/folder-page";

export class NavigateHelper {

  public static navigationHistory(): KoalaNavigateHistoryInterface[] {
    if (location.href.indexOf('components/icons') >= 0) {
      return [
        {name: 'Components', routerLink: '/components'},
        {name: 'Icons'}
      ];
    } else if (location.href.indexOf('components/icons-animated') >= 0) {
      return [
        {name: 'Components', routerLink: '/components'},
        {name: 'Icons Animated'}
      ];
    } else if (location.href.indexOf('components/folder-page') >= 0) {
      return [
        {name: 'Components', routerLink: '/components'},
        {name: 'Folder Page'}
      ];
    } else if (location.href.indexOf('components/dialog') >= 0) {
      return [
        {name: 'Components', routerLink: '/components'},
        {name: 'Dialog'}
      ];
    } else if (location.href.indexOf('components/button') >= 0) {
      return [
        {name: 'Components', routerLink: '/components'},
        {name: 'Button'}
      ];
    } else if (location.href.indexOf('components/list') >= 0) {
      return [
        {name: 'Components', routerLink: '/components'},
        {name: 'List'}
      ];
    } else if (location.href.indexOf('components/file-button') >= 0) {
      return [
        {name: 'Components', routerLink: '/components'},
        {name: 'File Button'}
      ];
    } else if (location.href.indexOf('components/dynamic-form') >= 0) {
      return [
        {name: 'Components', routerLink: '/components'},
        {name: 'Dynamic Form'}
      ];
    } else if (location.href.indexOf('services/page-loading') >= 0) {
      return [
        {name: 'Services', routerLink: '/services'},
        {name: 'Page Loader'}
      ];
    } else if (location.href.indexOf('services/xlsx') >= 0) {
      return [
        {name: 'Services', routerLink: '/services'},
        {name: 'XLSX'}
      ];
    } else if (location.href.indexOf('services/csv') >= 0) {
      return [
        {name: 'Services', routerLink: '/services'},
        {name: 'CSV'}
      ];
    } else if (location.href.indexOf('services/alert') >= 0) {
      return [
        {name: 'Services', routerLink: '/services'},
        {name: 'Alert'}
      ];
    } else if (location.href.indexOf('services/question') >= 0) {
      return [
        {name: 'Services', routerLink: '/services'},
        {name: 'Question'}
      ];
    } else if (location.href.indexOf('services/menu') >= 0) {
      return [
        {name: 'Services', routerLink: '/services'},
        {name: 'Menu'}
      ];
    } else if (location.href.indexOf('services/request') >= 0) {
      return [
        {name: 'Services', routerLink: '/services'},
        {name: 'Request'}
      ];
    } else if (location.href.indexOf('services/dynamic-form') >= 0) {
      return [
        {name: 'Services', routerLink: '/services'},
        {name: 'Dynamic Form'}
      ];
    } else if (location.href.indexOf('services/token') >= 0) {
      return [
        {name: 'Services', routerLink: '/services'},
        {name: 'Token'}
      ];
    } else if (location.href.indexOf('services/oauth2') >= 0) {
      return [
        {name: 'Services', routerLink: '/services'},
        {name: 'OAuth2'}
      ];
    } else if (location.href.indexOf('services/snackbar') >= 0) {
      return [
        {name: 'Services', routerLink: '/services'},
        {name: 'Snackbar'}
      ];
    } else if (location.href.indexOf('guides/crud-page') >= 0) {
      return [
        {name: 'Guides', routerLink: '/guides'},
        {name: 'Crud Page'}
      ];
    }
  }
}
