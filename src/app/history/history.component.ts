import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { TimerHistory } from './../common/core/interfaces';
import { HistoryService } from './../common/core/services/history.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  timerHistory: Observable<TimerHistory[]>;
  totalMinutes: Observable<number>;

  constructor(private historyService: HistoryService) {
    this.timerHistory = this.historyService.history.map(this.filterPastWeek);
    this.totalMinutes = this.timerHistory.map(this.pastWeekTotalMins);
  }

  ngOnInit() {
  }

  filterPastWeek(timerHistory: TimerHistory[]): TimerHistory[] {
    const date = new Date();
    const sevenDaysAgo = new Date(date.getTime() - (7 * 24 * 60 * 60 * 1000));
    return timerHistory.filter(history => new Date(history.date) > sevenDaysAgo);
  }

  pastWeekTotalMins(timerHistory: TimerHistory[]): number {
    return timerHistory.reduce((total, next) =>
      next.type === 25 ? total + next.type : total, 0);
  }
}
