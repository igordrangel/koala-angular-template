import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { KoalaNotificationInterface } from '../../../ngx-koala/src/lib/shared/components/notifications/koala.notification.interface';
import { KoalaUserMenuOptionsInterface } from '../../../ngx-koala/src/lib/shared/components/page/koala.user-menu-options.interface';
import { KoalaMenuModuleInterface } from '../../../ngx-koala/src/lib/shared/components/menu/koala.menu-module.interface';

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
