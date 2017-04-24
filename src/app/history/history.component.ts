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
    this.timerHistory = this.historyService.history;
    this.totalMinutes = this.historyService.totalMinutes;
  }

  ngOnInit() {
  }
}
