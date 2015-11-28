import {Component} from 'angular2/angular2';
import {PhaseType} from '../interfaces/interfaces';
import {FocusPhasePipe} from '../pipes/focus-phase.pipe';

declare let Firebase;

@Component({
    selector: 'focus-phase',
    templateUrl: 'app/components/focus-phase.component.html',
    pipes: [FocusPhasePipe], 
	inputs: ['focusPhase']
})
export class FocusPhaseCmp {
    focusPhase: any;

    constructor() { }
}
