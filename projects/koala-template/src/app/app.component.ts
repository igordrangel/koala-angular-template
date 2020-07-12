import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { KoalaNotificationInterface } from '../../../ngx-koala/src/lib/shared/components/notifications/koala.notification.interface';
import { KoalaUserMenuOptionsInterface } from '../../../ngx-koala/src/lib/shared/components/page/koala.user-menu-options.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public openPages = ['/login'];
  public userMenuOptions: KoalaUserMenuOptionsInterface[] = [
    {name: 'Alterar Senha', icon: 'vpn_key', action: this.alterarSenha}
  ]
  public notifications = new BehaviorSubject<KoalaNotificationInterface[]>([]);

  ngOnInit() {
    this.getNotifications();
  }

  public prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
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
      ])
    }, 5000);
  }

  public alterarSenha() {
  }
}
