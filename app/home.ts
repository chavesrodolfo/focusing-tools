import {Component, NgZone} from 'angular2/angular2';
import {PomTimer} from 'app/components/pom-timer';
import {DataService} from 'app/services/data.service';
import {Pomodori, EventType, AuthUser} from 'app/interfaces';
import {AuthService} from 'app/services/auth.service';

declare let Firebase;

@Component({
    selector: 'pom-home',
    templateUrl: 'app/home.html',
    directives: [PomTimer]
})
export class Home {
    constructor(
        private _dataService: DataService,
        private _authService: AuthService) { }

    eventCompleted(eventType: EventType) {
        this._dataService.addPomodori({
            eventType,
            dateCreated: Firebase.ServerValue.TIMESTAMP
        });
    }
}
