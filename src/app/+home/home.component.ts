import { Component, OnInit } from '@angular/core';
import { FocusTimerComponent } from '../shared/components/focus-timer';
import { NotificationService } from '../shared/services/notification.service';
import { NotificationPermission } from '../interfaces/interfaces';
declare let Firebase;

@Component({
  moduleId: module.id,
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
  directives: [FocusTimerComponent]
})
export class HomeComponent implements OnInit {
  notificationsEnabled: boolean;
  notificationsSupported: boolean;

  constructor(private _notificationService: NotificationService) { }

  ngOnInit() {
    this.notificationsEnabled = false;
    this.notificationsSupported = true;

    if (this._notificationService.hasPermission() === NotificationPermission.GRANTED) {
      this.notificationsEnabled = true;
    }

    if (this._notificationService.hasPermission() === NotificationPermission.UNSUPPORTED) {
      this.notificationsSupported = false;
    }
  }

  enableNotifications() {
    this._notificationService.requestPermission();
  }
}
