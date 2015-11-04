import {Component, NgZone} from 'angular2/angular2';
import {PomTimer} from 'app/components/pom-timer';
import {DataService} from 'app/services/data.service';
import {Pomodori, EventType} from 'app/interfaces';
declare let Firebase;

@Component({
    selector: 'pom-home',
    templateUrl: 'app/home.html',
    directives: [PomTimer]
})
export class Home {
    constructor(private _dataService: DataService) {
        this._dataService.loadPomodori();

        this._dataService.pomodori$.subscribe(val => console.log(val));
    }

    eventCompleted(pom) {
        console.log(pom);
        this._dataService.addPomodori({
            eventType: EventType.POMIDORO,
            dateCreated: Firebase.ServerValue.TIMESTAMP
        });
    }
}
