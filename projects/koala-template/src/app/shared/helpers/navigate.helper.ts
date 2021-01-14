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
    }
  }
}
