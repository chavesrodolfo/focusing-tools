import { NotificationService } from './../common/core/services/notification.service';
import { TimerHistory } from './../common/core/interfaces';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { TimerService } from './../common/core/services/timer.service';
import { TimerType } from './../common/core/interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentTime: Observable<Date>;
  timerType: Observable<TimerType>;
  timerHistory: Observable<TimerHistory[]>;
  notificationsEnabled: Observable<boolean>;

  constructor(private timerService: TimerService, private notificationService: NotificationService) { }

  ngOnInit() {
    this.currentTime = this.timerService.currentTime;
    this.timerType = this.timerService.timerType;
    this.notificationsEnabled = this.notificationService.notificationsEnabled;
  }

  startStandardTimer() {
    this.timerService.startStandardTimer();
  }

  startLongBreakTimer() {
    this.timerService.startLongBreakTimer();
  }

  startShortBreakTimer() {
    this.timerService.startShortBreakTimer();
  }

  enableNotifications() {
    this.notificationService.requestPermission();
  }

  private stopTimer() {
    this.timerService.stopTimer();
  }
}
