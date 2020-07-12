import { Component, EventEmitter, Input, Output } from '@angular/core';
import { KoalaNotificationInterface } from './koala.notification.interface';

@Component({
  selector: 'koala-notification-list',
  templateUrl: 'notification.component.html',
  styleUrls: ['notification.component.css']
})
export class NotificationComponent {
  @Input() notifications: KoalaNotificationInterface[];
  @Output() deleteAll = new EventEmitter<boolean>(false);
  @Output() delete = new EventEmitter<KoalaNotificationInterface>(null);

  public deleteAllNotifications() {
    this.deleteAll.emit(true);
  }

  public deleteNotification(notification: KoalaNotificationInterface) {
    this.delete.emit(notification);
  }
}
