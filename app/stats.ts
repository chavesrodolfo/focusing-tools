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
    user: any;
    phases: any[];
    userSubscription: any;
    focusSubscription: any;
    chart: any;

    constructor(
        private _authService: AuthService,
        private _dataService: DataService) {

        this.focusSubscription = this._authService.authUser$.subscribe(user => this.user = user);
        this.userSubscription = this._dataService.focusPhases$.subscribe(phases => {
            this.phases = phases;
            // this._setUpHistory();
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
        if (this.phases) {
            console.log(this.phases);
            let data = this._createGraphData(this.phases);
            let ctx = this.canvas.nativeElement.getContext('2d');
            let options = {
                responsive: true
            };

            this.chart = new Chart(ctx).Line(data, options);
        }
    }
}
