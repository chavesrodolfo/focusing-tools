import {Component, ViewChild} from 'angular2/core';
import {FocusPhaseCmp} from './components/focus-phase.component';
import {DataService} from './services/data.service';
import {AuthUser, AuthType, NotificationPermission, PhaseType} from './interfaces/interfaces';
import {AuthService} from './services/auth.service';
import {Observable} from 'rxjs/Observable';

declare let Firebase;
declare let Chart;

@Component({
    selector: 'focus-stats',
    templateUrl: 'app/stats.html',
    directives: [FocusPhaseCmp]
})
export class Stats {
    @ViewChild('canvas') canvas;
    userSession: any;
    focusPhases: any[] = [];
    chart: any;

    constructor(
        private _authService: AuthService,
        private _dataService: DataService) { }

    ngOnInit() {
        this.userSession = this._authService.userSession;
        this._dataService.focusPhases$.subscribe(phases => this.focusPhases = phases);
        this._dataService.loadFocusPhases();
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

    private _createGraphData(phases: any[]) {
        let labels = [];
        let data = [];
        let today = new Date();

        phases.forEach(phase => {
            if (phase.phaseType === PhaseType.FOCUS) {
                let date = new Date(phase.dateCreated);
                let formattedDate = `${date.getDay()}-${date.getMonth()}-${date.getFullYear()}`;
                labels.push(formattedDate);
                data.push(phase.phaseType);
            }
        });

        // for (let i = 0; i < 7; i++) {
        //     let newDate = Date.now() + -i * 24 * 3600 * 1000;
        //     let date = new Date(newDate);
        //     let formattedDate = `${date.getDay()}-${date.getMonth()}-${date.getFullYear()}`;
        //     labels.push(formattedDate);
        // }

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

    private _setUpHistory() {
        this._dataService.focusPhases$.subscribe(phases => {
            console.log(phases);
            
            // if (this.chart && this.chart.destroy) {
            //     this.chart.destroy();
            // }

            let data = this._createGraphData(phases);
            let ctx = this.canvas.nativeElement.getContext('2d');
            let options = {
                responsive: true
            };

            setTimeout(() => {
                console.log('run');
                this.chart = new Chart(ctx).Line(data, options);
            }, 2000);
        });
    }
}
