import {Component, ViewChild} from 'angular2/core';
import {FocusPhaseCmp} from './components/focus-phase.component';
import {DataService} from './services/data.service';
import {AuthUser, AuthType, NotificationPermission} from './interfaces/interfaces';
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
    authUser: Observable<AuthUser>;
    focusPhases: Observable<any>;
    
    constructor(
        private _authService: AuthService,
        private _dataService: DataService) { }
    
    ngOnInit() {
        this.focusPhases = this._dataService.focusPhases$;
        this._dataService.loadFocusPhases();

        this.authUser = this._authService.authUser$;
        // this._authService.loadAuthUser();
        setTimeout(() => this._authService.loadAuthUser(), 0); // hack need to fix
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
    
    private _setUpHistory() {
        let labels = [];
        let today = new Date();
        
        for(let i = 0; i <= 7; i++) {
            let newDate = Date.now() + -i*24*3600*1000; // date 5 days ago in milliseconds UTC
            labels.push(new Date(newDate).toUTCString());
        }

        let data = {
            labels,
            datasets: [
                {
                    label: "Focus",
                    fillColor: "rgba(220,220,220,0.2)",
                    strokeColor: "#d76450",
                    pointColor: "#d76450",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: [65, 59, 80, 81, 56, 55, 40]
                }
                // {
                //     label: "My Second dataset",
                //     fillColor: "rgba(151,187,205,0.2)",
                //     strokeColor: "rgba(151,187,205,1)",
                //     pointColor: "rgba(151,187,205,1)",
                //     pointStrokeColor: "#fff",
                //     pointHighlightFill: "#fff",
                //     pointHighlightStroke: "rgba(151,187,205,1)",
                //     data: [28, 48, 40, 19, 86, 27, 90]
                // }
            ]
        };

        setTimeout(() => {
            let ctx = this.canvas.nativeElement.getContext('2d');
            let options = {
                responsive: true  
            };
            
            var myLineChart = new Chart(ctx).Line(data, options);
        }, 0);
    }
}
