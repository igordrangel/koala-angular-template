import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { KoalaNotificationInterface } from './koala.notification.interface';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'koala-notification-list',
  templateUrl: 'notification.component.html',
  styleUrls: ['notification.component.css']
})
export class NotificationComponent implements OnChanges {
  @Input() notifications: KoalaNotificationInterface[];
  @Output() deleteAll = new EventEmitter<boolean>(false);
  @Output() delete = new EventEmitter<KoalaNotificationInterface>(null);
  
  constructor(private titleService: Title) {}
  
  ngOnChanges(changes: SimpleChanges) {
    const appName = this.titleService.getTitle().split(' ')[0];
    if (changes.notifications && this.notifications.length > 0) {
      this.titleService.setTitle(`(${this.notifications.length}) ${appName}`);
    } else {
      this.titleService.setTitle(`${appName}`);
    }
  }
  
  public deleteAllNotifications() {
    this.deleteAll.emit(true);
  }
  
  public deleteNotification(notification: KoalaNotificationInterface) {
    this.delete.emit(notification);
  }
}
