import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { KoalaNotificationInterface } from '../../../ngx-koala/src/lib/shared/components/notifications/koala.notification.interface';
import { KoalaUserMenuOptionsInterface } from '../../../ngx-koala/src/lib/shared/components/page/koala.user-menu-options.interface';
import { KoalaMenuModuleInterface } from '../../../ngx-koala/src/lib/shared/components/menu/koala.menu-module.interface';
import { KoalaPagePalletColorsInterface } from '../../../ngx-koala/src/lib/shared/components/page/koala-page-pallet-colors.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public openPages = ['/login'];
  public userMenuOptions: KoalaUserMenuOptionsInterface[] = [
    {name: 'Alterar Senha', icon: 'vpn_key', action: this.alterarSenha}
  ];
  public notifications = new BehaviorSubject<KoalaNotificationInterface[]>([]);
  public menuOptions: KoalaMenuModuleInterface[] = [
    {
      icon: 'extension',
      name: 'Componentes',
      expanded: false,
      tools: [
        {name: 'Login', routerLink: '/login'},
        {name: 'KoalaList', routerLink: '/list'},
        {name: 'KoalaForm', routerLink: '/forms'}
      ]
    }
  ];
  public palletColors: KoalaPagePalletColorsInterface = {
    userPresentationBackground: '#212121',
    firstColor: '#212121',
    secondColor: '#424242',
    bodyBackground: '#424242',
    fontColor: '#f1f1f1',
    fontHoverColor: '#fff',
    fontActiveColor: '#eee',
    menuTitleBackground: 'rgba(255,255,255,.1)',
    menuTitleColor: 'rgba(255,255,255,.3)',
    menuBackground: '#212121',
    menuOptionsBackground: '#292929',
    menuOptionsColor: '#f1f1f1',
    menuOptionsColorHover: '#fff',
    menuOptionsColorActive: '#eee',
    listBackground: '#424242',
    listItemHover: 'rgba(0,0,0,.1)',
    listItemActive: 'rgba(0,0,0,.3)',
    shadowColorTableList: 'rgba(255, 255, 255, .4)'
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
        {id: 1, title: 'Demo 1', text: 'Esta é uma notificação de demonstração.'},
        {id: 2, title: 'Demo 2', text: 'Esta é uma notificação de demonstração.'}
      ]);
    }, 5000);
  }

  public alterarSenha() {
  }
}
