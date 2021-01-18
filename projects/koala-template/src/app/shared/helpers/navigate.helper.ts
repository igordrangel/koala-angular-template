import { KoalaNavigateHistoryInterface } from "../../../../../ngx-koala/src/lib/shared/components/folder-page/koala-navigate-history.interface";

export class NavigateHelper {

  public static navigationHistory(): KoalaNavigateHistoryInterface[] {
    if (location.href.indexOf('components/icons') >= 0) {
      return [
        {name: 'Components', routerLink: '/components'},
        {name: 'Icons'}
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
    } else if (location.href.indexOf('components/alert') >= 0) {
      return [
        {name: 'Components', routerLink: '/components'},
        {name: 'Alert'}
      ];
    } else if (location.href.indexOf('components/question') >= 0) {
      return [
        {name: 'Components', routerLink: '/components'},
        {name: 'Question'}
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
    } else if (location.href.indexOf('components/forms') >= 0) {
      return [
        {name: 'Components', routerLink: '/components'},
        {name: 'Forms'}
      ];
    } else if (location.href.indexOf('services/page-loader') >= 0) {
      return [
        {name: 'Services', routerLink: '/services'},
        {name: 'Page Loader'}
      ];
    }
  }
}
