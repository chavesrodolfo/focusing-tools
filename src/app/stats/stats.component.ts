import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../shared/services/auth.service';
import { DataService } from '../shared/services/data.service';

import { FocusPhaseComponent } from '../shared/components/focus-phase';

import {
  AuthUser,
  AuthType,
  NotificationPermission,
  PhaseType,
  FocusPhase
} from '../interfaces/interfaces';

import 'chart.js';
declare let Chart;

// import * as ChartJS from 'chart.js';

@Component({
  selector: 'app-stats',
  templateUrl: 'stats.component.html',
  styleUrls: ['stats.component.scss']
})
export class StatsComponent implements OnInit {
  @ViewChild('canvas') canvas;
  graphCreated: boolean = false;
  user$: any;
  userSubscription: any;
  focusSubscription: any;
  chart: any;
  totalFocusedTime: number = 0;

  constructor(
    private authService: AuthService,
    private dataService: DataService) {
  }

  ngOnInit() {
    this.user$ = this.authService.authUser$;
  }

  ngAfterViewInit() {
    this.userSubscription = this.authService.authUser$.subscribe(() => {
      this.focusSubscription = this.dataService.focusPhases$.subscribe((phases: FocusPhase[]) => {
        this._setUpHistory(phases);
      });
    });
  }

  ngOnDestroy() {
    this.focusSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  loginTwitter() {
    this.authService.login(AuthType.TWITTER);
  }

  loginGithub() {
    this.authService.login(AuthType.GITHUB);
  }

  // Yeah, I know working on cleaning this up to a service...
  private _setUpHistory(phases: FocusPhase[]) {
    if (phases && this.canvas) {
      let data = this._createGraphData(phases);
      let ctx = this.canvas.nativeElement.getContext('2d');
      let options = { responsive: true };

      this.chart = new Chart(ctx, {
        type: 'line',
        data,
        options
      });
    }
  }

  private _createGraphData(phases: any[]) {
    let labels = [];
    let data = [];
    let dates = [];

    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth();
    let date = today.getDate();

    for (let i = 0; i < 14; i++) {
      let day = new Date(year, month, date - i);
      labels.push(`${day.getUTCDate()}-${day.getUTCMonth() + 1}-${day.getUTCFullYear()}`);
      dates.push(day);
      data.push(0);
    }

    dates.forEach((day, i) => {
      phases.forEach((phase, j) => {
        if (this._isSameDay(day, new Date(phase.dateCreated))) {
          data[i] = data[i] + 1;
        }
      });
    });

    labels.reverse();
    data.reverse();

    return {
      labels,
      datasets: [
        {
          label: "Focus",
          fillColor: "rgba(220,220,220,0.2)",
          strokeColor: "#d76450",
          pointColor: "#d76450",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#d76450",
          pointHighlightStroke: "rgba(220,220,220,1)",
          data
        }
      ]
    };
  }

  private _isSameDay(d1, d2) {
    if ((d1.getDay() === d2.getDay()) && (d1.getMonth() === d2.getMonth()) && (d1.getYear() === d2.getYear())) {
      return true;
    }

    return false;
  }
}