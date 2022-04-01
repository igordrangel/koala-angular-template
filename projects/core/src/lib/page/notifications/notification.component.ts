import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { KoalaNotificationInterface } from './koala.notification.interface';

@Component({
  selector: 'koala-notification-list',
  templateUrl: 'notification.component.html',
  styleUrls: ['notification.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationComponent implements OnChanges {
  @Input() notifications: KoalaNotificationInterface[];
  @Output() deleteAll = new EventEmitter<boolean>(false);
  @Output() delete = new EventEmitter<KoalaNotificationInterface>(null);

  private appName: string;

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    this.appName = document.title.indexOf(') ') >= 0 ? document.title.split(') ')[1] : document.title;
    if (changes.notifications && this.notifications.length > 0) {
      document.title = `(${this.notifications.length}) ${this.appName}`;
    } else {
      document.title = this.appName;
    }
  }

  public deleteAllNotifications() {
    this.deleteAll.emit(true);
  }

  public deleteNotification(notification: KoalaNotificationInterface) {
    this.delete.emit(notification);
  }
}
