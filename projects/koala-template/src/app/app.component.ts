import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { KoalaNotificationInterface } from '../../../ngx-koala/src/lib/shared/components/notifications/koala.notification.interface';
import { KoalaUserMenuOptionsInterface } from '../../../ngx-koala/src/lib/shared/components/page/koala.user-menu-options.interface';
import { KoalaMenuModuleInterface } from '../../../ngx-koala/src/lib/shared/components/menu/koala.menu-module.interface';
import { KoalaPagePalletColorsInterface } from '../../../ngx-koala/src/lib/shared/components/page/koala-page-pallet-colors.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  public openPages = ['/login'];
  public userMenuOptions: KoalaUserMenuOptionsInterface[] = [
    {name: 'Alterar Senha', icon: 'vpn_key', action: () => this.alterarSenha()}
  ];
  public notifications = new BehaviorSubject<KoalaNotificationInterface[]>([]);
  public menuOptions: KoalaMenuModuleInterface[] = [{
    icon: 'extension',
    name: 'Componentes',
    expanded: false,
    tools: [
      {name: 'Login', routerLink: '/login'},
      {name: 'KoalaList', routerLink: '/list'},
      {name: 'KoalaForm', routerLink: '/forms'}
    ]
  }, {
    name: 'Componentes',
    expanded: false,
    tools: [
      {icon: 'login', name: 'Login', routerLink: '/login'},
      {icon: 'list_alt', name: 'KoalaList', routerLink: '/list'},
      {icon: 'description', name: 'KoalaForm', routerLink: '/forms'}
    ]
  }];
  public palletCollors: KoalaPagePalletColorsInterface = {
    userPresentationUserFontColor: '#01579B',
    userPresentationUserBackground: '#fff',
    userPresentationBackground: 'url(\'./assets/wallpappers/folder-cia.png\') no-repeat 100% 0%',
    toolbarBackground: '#012d51',
    toolbarColor: '#fff',
    menuTitleBackground: 'rgba(0,0,0,.3)',
    menuTitleColor: '#fff',
    menuBackground: '#013966',
    menuOptionsBackground: '#012d51',
    menuOptionsColor: 'rgba(255,255,255,.8)',
    menuOptionsColorHover: 'rgba(255,255,255,.9)',
    menuOptionsColorActive: '#fff',
    checkboxBackground: '#FFB300',
    checkboxColor: '#01579B',
    checkboxOutlineColor: '#fff',
    firstColor: '#012d51',
    secondColor: '#012d51',
    fontColor: '#fff',
    bodyBackground: '#012d51',
    notificationTitleColor: '#fff',
    notificationContentTitleColor: 'rgba(255,255,255,.8)',
    notificationContentColor: '#fff',
    notificationContentIconColor: '#fff',
    filterIconColor: '#fff',
    listItemColor: '#fff',
    listTitleItemColor: '#f1f1f1',
    listBackground: '#013966',
    listItemBackgroudHover: '#012d51',
    listItemBackgroundActive: '#012441',
    listContentBackground: '#012d51',
    shadowColorTableList: 'rgba(255,255,255,.2)',
    scrollbarColor: 'rgba(255,255,255,.8)',
    scrollbarColorHover: '#fff'
  };
  
  ngOnInit() {
    this.getNotifications();
  }
  
  public deleteAllNotifications(action: boolean) {
    if (action) {
      this.notifications.next([]);
    }
  }
  
  public deleteNotification(notification: KoalaNotificationInterface) {
    this.notifications.next(this.notifications?.value.filter(item => item !== notification));
  }
  
  public getNotifications() {
    setTimeout(() => {
      this.notifications.next([
        {id: 1, title: 'KoalaList', text: 'Esta notificação irá redirecionar para a página de Listas.', redirectTo: '/list'},
        {id: 2, title: 'KoalaForm', text: 'Esta notificação irá redirecionar para a página de Formulários.', redirectTo: '/forms'}
      ]);
    }, 5000);
  }
  
  public alterarSenha() {
  }
}
