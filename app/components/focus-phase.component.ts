import {Component, NgZone, CORE_DIRECTIVES} from 'angular2/angular2';
import {PhaseType} from '../interfaces/interfaces';
import {FocusPhasePipe} from '../pipes/focus-phase.pipe';

declare let Firebase;

@Component({
    selector: 'focus-phase',
    templateUrl: 'app/components/focus-phase.component.html',
    directives: [CORE_DIRECTIVES],
    pipes: [FocusPhasePipe], 
	inputs: ['focusPhase']
})
export class FocusPhaseCmp {
    focusPhase: any;

    constructor() { }
}
