import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as addDays from 'date-fns/add_days';
import * as isSameDay from 'date-fns/is_same_day';
import { map, startWith } from 'rxjs/operators';

import { TimerHistory } from './../common/core/interfaces';
import { HistoryService } from './../common/core/services/history.service';

interface Series {
  name: string;
  value: number;
}

interface GraphData {
  name: string;
  series: Series[];
}

// loop through last 30 day dates
// foreach history if in day push to day array

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  results: Observable<GraphData[]>;
  timerHistory: Observable<TimerHistory[]>;
  totalMinutes: Observable<number>;
  colorScheme = {
    domain: ['#f44336', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(private historyService: HistoryService) {
    this.timerHistory = this.historyService.history.pipe(map(this.filterPastThirtyDays));
    this.results = this.historyService.history.pipe(
      startWith([]),
      map(i => this.filterPastThirtyDays(i)),
      map(i => this.getGraphData(i))
    );

    this.totalMinutes = this.timerHistory.pipe(map(this.pastWeekTotalMins));
  }

  ngOnInit() { }

  filterPastThirtyDays(timerHistory: TimerHistory[]): TimerHistory[] {
    const date = new Date();
    const sevenDaysAgo = new Date(date.getTime() - (30 * 24 * 60 * 60 * 1000));
    return timerHistory.filter(history => new Date(history.date) > sevenDaysAgo);
  }

  pastWeekTotalMins(timerHistory: TimerHistory[]): number {
    return timerHistory.reduce((total, next) =>
      next.type === 25 ? total + next.type : total, 0);
  }

  private getGraphData(timerHistory: TimerHistory[]): GraphData[] {
    const today = new Date();
    const thirtyDaysAgo = new Date(today.getTime() - (30 * 24 * 60 * 60 * 1000));

    const graphData = {
      name: 'Completed Tasks',
      series: this.getDates(thirtyDaysAgo, today)
    };

    timerHistory.forEach(history => {
      graphData.series.forEach(series => {
        if (isSameDay(series.name, history.date)) {
          series.value++;
        }
      });
    });

    return [graphData];
  }

  private getDates(startDate: Date, stopDate: Date): Series[] {
    const dateArray = [];
    let currentDate = startDate;

    while (currentDate <= addDays(stopDate, 1)) {
      dateArray.push({ name: new Date(currentDate), value: 0 });
      currentDate = addDays(currentDate, 1);
    }

    return dateArray;
  }
}
