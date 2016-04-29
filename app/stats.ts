import {Component, ViewChild} from 'angular2/core';
import {FocusPhaseCmp} from './components/focus-phase.component';
import {DataService} from './services/data.service';
import {AuthUser, AuthType, NotificationPermission, PhaseType} from './interfaces/interfaces';
import {AuthService} from './services/auth.service';
import {Observable} from 'rxjs/Observable';
import {FocusPhase} from './interfaces/interfaces';

declare let Firebase;
declare let Chart;

@Component({
    selector: 'focus-stats',
    templateUrl: 'app/stats.html',
    directives: [FocusPhaseCmp]
})
export class Stats {
    @ViewChild('canvas') canvas;
    graphCreated: boolean = false;
    user: any;
    phases: any[];
    userSubscription: any;
    focusSubscription: any;
    chart: any;
    totalFocusedTime: number = 0;

    constructor(
        private _authService: AuthService,
        private _dataService: DataService) {

        this.focusSubscription = this._authService.authUser$.subscribe(user => this.user = user);
        this.userSubscription = this._dataService.focusPhases$.subscribe((phases: FocusPhase[]) => {
            this.phases = phases;
            this._setUpHistory();
            // this.totalFocusedTime = data.reduce((a, b) => a + b) * PhaseType.FOCUS;
        });
    }

    ngOnInit() {
        this._authService.loadAuthUser();
        this._dataService.loadFocusPhases();
    }

    ngOnDestroy() {
        this.focusSubscription.unsubscribe();
        this.userSubscription.unsubscribe();
    }

    ngAfterViewInit() {
        this._setUpHistory();
    }

    loginTwitter() {
        this._authService.login(AuthType.TWITTER);
    }

    loginGithub() {
        this._authService.login(AuthType.GITHUB);
    }

    // Yeah, I know working on cleaning this up to a service...
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

    private _setUpHistory() {
        if (this.phases && this.canvas && this.graphCreated === false) {
                let data = this._createGraphData(this.phases);
            let ctx = this.canvas.nativeElement.getContext('2d');
            let options = {
                responsive: true
            };

            this.chart = new Chart(ctx).Line(data, options);
            this.graphCreated = true;
        }
    }
}
