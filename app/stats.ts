import {Component, NgZone, CORE_DIRECTIVES} from 'angular2/angular2';
import {PomTimer} from 'app/components/pom-timer';
import {DataService} from 'app/services/data.service';
import {Pomodori, EventType, AuthUser} from 'app/interfaces';
import {AuthService} from 'app/services/auth.service';

declare let Firebase;

@Component({
    selector: 'pom-stats',
    templateUrl: 'app/stats.html',
    directives: [CORE_DIRECTIVES, PomTimer]
})
export class Stats {
    displayName: string;
    displayImage: string;
    pomodori: any;
    
    constructor(
        private _authService: AuthService,
        private _dataService: DataService) { 
        
        this.displayName = 'Not signed in.';
        this.pomodori = [];
        
        if(this._authService.isLoggedIn()) {
            this.displayName = this._authService.userSession.twitter.displayName;
            this.displayImage = this._authService.userSession.twitter.profileImageURL;
            this._dataService.pomodori$.subscribe(val => this.pomodori = val);
            this._dataService.loadPomodori();
        }
    }

    login() {
        this._authService.login();
    }

    logout() {
        this._authService.logout();
        this.displayName = 'Not signed in.';
    }
}
