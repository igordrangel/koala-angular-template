import { KoalaNavigateHistoryInterface } from "../../../../../ngx-koala/src/lib/shared/components/folder-page/koala-navigate-history.interface";

export class NavigateHelper {

  public static navigationHistory(): KoalaNavigateHistoryInterface[] {
    if (location.href.indexOf('components/icons') >= 0) {
      const arrUrl = location.href.split('/');
      return [
        {name: 'Componentes', routerLink: '/components'},
        {name: 'Ícones'}
      ];
    }
  }
}
