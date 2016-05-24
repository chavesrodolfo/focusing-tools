import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NotificationPermission } from '../../interfaces/interfaces';

import 'notification'; // Browser W3C Spec Notification API Polyfill
declare let Notification;

@Injectable()
export class NotificationService {
  hasPermission() {
    const permission = Notification.permission;

    if (permission === 'granted') {
      return NotificationPermission.GRANTED;
    } else if (permission === 'denied') {
      return NotificationPermission.DENIED;
    } else if (permission === 'unknown') {
      return NotificationPermission.UNSUPPORTED;
    }
  }

  requestPermission() {
    Notification.requestPermission(permission => {
      console.log(permission);
    });
  }

  openNotification(message: string, body = '') {
    new Notification(message, {
      body,
      icon: '/assets/images/favicon.ico'
    });
  }
}