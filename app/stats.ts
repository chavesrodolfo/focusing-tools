import {Component} from 'angular2/core';
import {FocusPhaseCmp} from './components/focus-phase.component';
import {DataService} from './services/data.service';
import {AuthUser, AuthType, NotificationPermission} from './interfaces/interfaces';
import {AuthService} from './services/auth.service';

declare let Firebase;

@Component({
    selector: 'focus-stats',
    templateUrl: 'app/stats.html',
    directives: [FocusPhaseCmp]
})
export class Stats {
    authUser: AuthUser;
    focusPhases: any;
    
    constructor(
        private _authService: AuthService,
        private _dataService: DataService) {

        this._dataService.focusPhases$.subscribe(focusPhases => this.focusPhases = focusPhases);
        this._dataService.loadFocusPhases();

        this._authService.authUser$.subscribe(authUser => this.authUser = authUser);
        this._authService.loadAuthUser();
    }

    loginTwitter() {
        this._authService.login(AuthType.TWITTER);
    }

    loginGithub() {
        this._authService.login(AuthType.GITHUB);
    }
}
