import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as Push from 'push.js';

import { NotificationService } from './notification.service';
import { HistoryService } from './history.service';
import { TimerHistory, TimerType } from './../interfaces';
import { AppState } from './../store/app.state';
import { SetActiveTimeAction, AddTimerHistoryAction, SetTimerTypeAction } from './../store/timer/actions';

@Injectable()
export class TimerService {
  currentTime: Observable<Date>;
  timerType: Observable<TimerType>;
  private timer = null;

  constructor(
    private store: Store<AppState>,
    private historyService: HistoryService,
    private notificationService: NotificationService) {
    this.currentTime = this.store.select(state => state.timer.activeTime);
    this.timerType = this.store.select(state => state.timer.timerType);
  }

  startStandardTimer() {
    this.startTimer(TimerType.Standard);
  }

  startShortBreakTimer() {
    this.startTimer(TimerType.ShortBreak);
  }

  startLongBreakTimer() {
    this.startTimer(TimerType.LongBreak);
  }

  stopTimer() {
    const time = new Date();
    time.setMinutes(0);
    time.setSeconds(0);
    clearInterval(this.timer);
    this.timer = null;
    this.store.dispatch(new SetTimerTypeAction(null));
    this.store.dispatch(new SetActiveTimeAction(time));
  }

  startTimer(minutes: TimerType) {
    this.store.dispatch(new SetTimerTypeAction(minutes));
    if (this.timer !== null) {
      this.stopTimer();
    } else {
      const time = new Date();
      time.setMinutes(minutes); // minutes
      time.setSeconds(0); // 0

      this.timer = setInterval(() => {
        if (this.timeIsComplete(time)) {
          this.stopTimer();
          this.completeTimer(time, minutes);
        } else {
          time.setSeconds(time.getSeconds() - 1);
          this.store.dispatch(new SetActiveTimeAction(time));
        }
      }, 1000);
    }
  }

  private completeTimer(time: Date, timerType: TimerType) {
    const date = new Date();
    const history: TimerHistory = { date: date.toString(), type: timerType };
    this.historyService.addHistory(history).subscribe();
    this.store.dispatch(new SetTimerTypeAction(null));
    this.notificationService.notify();
  }

  private timeIsComplete(time: Date) {
    return time.getSeconds() === 0 && time.getMinutes() === 0;
  }
}
