import {Component, NgZone} from 'angular2/angular2';
import {FocusTimerCmp} from './components/focus-timer.component';
import {DataService} from './services/data.service';
import {PhaseType} from './interfaces/interfaces';
import {AuthService} from './services/auth.service';

declare let Firebase;

@Component({
    selector: 'focus-home',
    templateUrl: 'app/home.html',
    directives: [FocusTimerCmp]
})
export class Home {
    constructor(
        private _dataService: DataService,
        private _authService: AuthService) { }

    eventCompleted(phaseType: PhaseType) {
        this._dataService.addFocusPhase({
            phaseType,
            dateCreated: Firebase.ServerValue.TIMESTAMP
        });
    }
}
