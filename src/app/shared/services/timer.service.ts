import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { NotificationService, DataService } from '../../shared';
import { PhaseType } from '../../interfaces/interfaces';

declare let Firebase;

@Injectable()
export class TimerService {
  runningTime$: Observable<Date | {}>;
  focusRunning: boolean;
  clockRunning: boolean;

  private _timerObserver: any;
  private _runningTime: Date;
  private _interval: any;
  private _selectedTime: number;

  constructor(
    private dataService: DataService,
    private notificationService: NotificationService) {

    this.runningTime$ = new Observable(observer => this._timerObserver = observer);
    this.runningTime$.subscribe();
    this.stopTimer();
    this._selectedTime = null;
  }

  get runningPhaseType() {
    return this._selectedTime;
  }

  startTimer(time: PhaseType) {
    if (this.clockRunning) {
      this.stopTimer();
    } else {
      this._startTimer(time);
      this._selectedTime = time;
      this.focusRunning = true;
    }
  }

  stopTimer() {
    clearInterval(this._interval);
    this._runningTime = new Date();
    this._runningTime.setMinutes(0);
    this._runningTime.setSeconds(0);
    this._timerObserver.next(this._runningTime);
    this.clockRunning = false;
    this._selectedTime = null;
  }

  private _startTimer(phaseType: PhaseType) {
    this._selectedTime = phaseType;
    this.clockRunning = true;
    this._runningTime.setMinutes(phaseType);
    this._runningTime.setSeconds(1); // test until ready for mins

    this._interval = setInterval(() => {
      if (this._timerFinished()) {
        this._saveTime();
        this.stopTimer();
      } else {
        this._runningTime = new Date(this._runningTime.getTime() - 1000);
      }

      this._timerObserver.next(this._runningTime);
    }, 1000);
  }

  private _timerFinished() {
    return (this._runningTime.getSeconds() === 0 && this._runningTime.getMinutes() === 0);
  }

  private _saveTime() {
    let phaseType = null;
    let message = null;

    switch (this._selectedTime) {
      case PhaseType.FOCUS:
        phaseType = PhaseType.FOCUS;
        message = 'Focus Phase Complete!';
        break;
      case PhaseType.SHORT_BREAK:
        phaseType = PhaseType.SHORT_BREAK;
        message = 'Short Break Complete!';
        break;
      case PhaseType.LONG_BREAK:
        phaseType = PhaseType.LONG_BREAK;
        message = 'Long Break Complete!';
        break;
      default:
        phaseType = this._selectedTime;
        message = 'Custom Brake Complete!';
        break;
    }

    this._selectedTime = null;
    this.dataService.addFocusPhase({ phaseType, dateCreated: Firebase.ServerValue.TIMESTAMP });
    this.notificationService.openNotification(message);
  }

  private getPhaseTypeMins
}