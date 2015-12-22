import {Component} from 'angular2/core';
import {FocusTimerCmp} from './components/focus-timer.component';
import {NotificationService} from './services/notification.service';
import {NotificationPermission} from './interfaces/interfaces';

declare let Firebase;

@Component({
    selector: 'focus-home',
    templateUrl: 'app/home.html',
    directives: [FocusTimerCmp]
})
export class Home {
    notificationsEnabled: boolean;
    notificationsSupported: boolean;

    constructor(
        private _notificationService: NotificationService) {
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
