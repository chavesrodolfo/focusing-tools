import { Component, OnInit } from '@angular/core';

import { NotificationService } from '../shared/services/notification.service';
import { NotificationPermission } from '../interfaces/interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  notificationsEnabled: boolean;
  notificationsSupported: boolean;

  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    this.notificationsEnabled = false;
    this.notificationsSupported = true;

    if (this.notificationService.hasPermission() === NotificationPermission.GRANTED) {
      this.notificationsEnabled = true;
    }

    if (this.notificationService.hasPermission() === NotificationPermission.UNSUPPORTED) {
      this.notificationsSupported = false;
    }
  }

  enableNotifications() {
    this.notificationService.requestPermission();
  }
}
