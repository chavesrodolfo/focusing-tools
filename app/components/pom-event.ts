import {Component, NgZone, CORE_DIRECTIVES} from 'angular2/angular2';
import {Pomodori, EventType} from 'app/interfaces';
import {PomEventPipe} from 'app/pipes/pom-event.pipe';

declare let Firebase;

@Component({
    selector: 'pom-event',
    templateUrl: 'app/components/pom-event.html',
    directives: [CORE_DIRECTIVES],
    pipes: [PomEventPipe], 
	inputs: ['pomodoro']
})
export class PomEvent {
    pomodoro: any;

    constructor() { }
}
