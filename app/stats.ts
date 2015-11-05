import {Component, NgZone, CORE_DIRECTIVES} from 'angular2/angular2';
import {PomTimer} from 'app/components/pom-timer';
import {PomEvent} from 'app/components/pom-event';
import {DataService} from 'app/services/data.service';
import {Pomodori, EventType, AuthUser} from 'app/interfaces';
import {AuthService} from 'app/services/auth.service';

declare let Firebase;

@Component({
    selector: 'pom-stats',
    templateUrl: 'app/stats.html',
    directives: [CORE_DIRECTIVES, PomTimer, PomEvent]
})
export class Stats {
    authUser: AuthUser;
    pomodori: any;

    constructor(
        private _authService: AuthService,
        private _dataService: DataService) {

        this._dataService.pomodori$.subscribe(pomodori => this.pomodori = pomodori);
        this._dataService.loadPomodori();
        
        this._authService.authUser$.subscribe(authUser => this.authUser = authUser);
        this._authService.loadAuthUser();
    }

    login() {
        this._authService.login();
    }
}
