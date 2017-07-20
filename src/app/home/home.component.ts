import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { TimerService } from './../common/core/services/timer.service';
import { TimerType } from './../common/core/interfaces';
import { TimerHistory } from './../common/core/interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentTime: Observable<Date>;
  timerType: Observable<TimerType>;
  timerHistory: Observable<TimerHistory[]>;
  doughnut = 0.1;
  colorScheme = { domain: ['#f44336', '#ccc'] };
  progress: Observable<any[]>;

  constructor(private timerService: TimerService) { }

  ngOnInit() {
    this.timerType = this.timerService.timerType;
    this.currentTime = this.timerService.currentTime;

    this.progress = Observable
      .combineLatest(this.timerService.currentTime, this.timerService.timerType)
      .map(([date, timerType]) => {
        if (date && date.getMinutes()) {
          const minsLeft = date.getMinutes();
          const minsCompleted = timerType - minsLeft;
          const complete = (minsCompleted / timerType) * 100;
          const left = (minsLeft / timerType) * 100;

          return [
            {
              name: 'Completed',
              value: complete
            },
            {
              name: 'Time Left',
              value: left
            }
          ];
        } else {
          return [
            {
              name: 'Completed',
              value: 0
            },
            {
              name: 'Time Left',
              value: 100
            }
          ];
        }
      });
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

  private stopTimer() {
    this.timerService.stopTimer();
  }
}
