import {Component, OnInit, EventEmitter, Output} from '@angular/core';

import { TimerService } from '../../../shared';
import { PhaseType } from '../../../interfaces/interfaces';

@Component({
  moduleId: module.id,
  selector: 'app-focus-timer',
  templateUrl: 'focus-timer.component.html',
  styleUrls: ['focus-timer.component.css']
})
export class FocusTimerComponent implements OnInit {
  runningTime: Date;
  @Output() timeCompleted: EventEmitter<boolean | {}>;
  phaseType: PhaseType;
  focusRunning: boolean;
  shortRunning: boolean;
  longRunning: boolean;
  clockRunning: boolean;

  private _selectedTime: number;
  private _interval: any;

  constructor(private timerService: TimerService) {
    this.timeCompleted = new EventEmitter();
    this.runningTime = new Date();
    this.runningTime.setMinutes(0);
    this.runningTime.setSeconds(0);

    this.clockRunning = false;
    this.timerService.runningTime$.subscribe((time: Date) => this._calcTime(time));
    this.phaseType = this.timerService.runningPhaseType;
  }

  ngOnInit() {
  }

  startFocus() {
    if (this.clockRunning) {
      this.timerService.stopTimer();
    } else {
      this.timerService.startTimer(PhaseType.FOCUS);
    }

    this.phaseType = this.timerService.runningPhaseType;
  }

  startShortBreak() {
    if (this.clockRunning) {
      this.timerService.stopTimer();
    } else {
      this.timerService.startTimer(PhaseType.SHORT_BREAK);
    }

    this.phaseType = this.timerService.runningPhaseType;
  }

  startLongBreak() {
    if (this.clockRunning) {
      this.timerService.stopTimer();
    } else {
      this.timerService.startTimer(PhaseType.LONG_BREAK);
    }

    this.phaseType = this.timerService.runningPhaseType;
  }

  private _calcTime(time: Date) {
    this.runningTime = time;
    this.clockRunning = true;
    document.title = `${this.runningTime.getMinutes()}:${this.runningTime.getSeconds()}`;

    if (this.runningTime.getSeconds() === 0 && this.runningTime.getMinutes() === 0) {
      this.timeCompleted.next(true);
      this.phaseType = null;
      this.clockRunning = false;
      document.title = 'Focus Time Management';
    }
  }
}