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
  public menuOptions = new BehaviorSubject<KoalaMenuModuleInterface[]>([{
    icon: 'list_alt',
    name: 'KoalaList',
    routerLink: '/list'
  }, {
    icon: 'description',
    name: 'KoalaForm',
    routerLink: '/forms'
  }]);
  public palletCollors: KoalaPagePalletColorsInterface = {
    userPresentationUserFontColor: '#fafafa',
    userPresentationUserBackground: '#b71c1c',
    toolbarBackground: '#fafafa',
    toolbarColor: '#b71c1c',
    menuTitleBackground: 'rgba(143,0,0,.3)',
    menuTitleColor: '#ffffff',
    menuBackground: '#ffebee',
    menuOptionsBackground: '#b71c1c',
    menuOptionsColor: 'rgba(255,0,0,0.4)',
    menuOptionsColorHover: 'rgba(143,0,0,.9)',
    menuOptionsColorActive: '#ffffff',
    checkboxBackground: '#b71c1c',
    checkboxColor: '#ffffff',
    checkboxOutlineColor: '#b71c1c',
    firstColor: '#fafafa',
    secondColor: '#b71c1c',
    fontColor: '#b71c1c',
    bodyBackground: '#fafafa',
    notificationTitleColor: '#b71c1c',
    notificationContentTitleColor: 'rgba(255,0,0,.8)',
    notificationContentColor: '#b71c1c',
    notificationContentIconColor: '#b71c1c',
    filterIconColor: '#b71c1c',
    listItemColor: '#b71c1c',
    listTitleItemColor: '#b71c1c',
    listBackground: '#fafafa',
    listItemBackgroudHover: '#f1f1f1',
    listItemBackgroundActive: '#f1f1f1',
    listContentBackground: '#fafafa',
    shadowColorTableList: 'rgba(143,0,0,0.2)',
    scrollbarColor: 'rgba(255,0,0,0.8)',
    scrollbarColorHover: '#b71c1c'
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
