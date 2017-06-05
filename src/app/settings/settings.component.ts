import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { NotificationService } from './../common/core/services/notification.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  notificationsEnabled: Observable<boolean>;
  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    this.notificationsEnabled = this.notificationService.notificationsEnabled;
  }

  enableNotifications() {
    this.notificationService.requestPermission();
  }
}
