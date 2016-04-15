import {Pipe} from 'angular2/core';
import {PhaseType} from '../interfaces/interfaces';

@Pipe({
    name: 'phasetype'
})
export class FocusPhasePipe {
    transform(val: PhaseType, args) {
		switch(val) {
			case PhaseType.FOCUS:
				return 'Focused';
			case PhaseType.SHORT_BREAK:
				return 'Short Break';
			case PhaseType.LONG_BREAK: 
				return 'Long Break';
			default:
				return 'Custom';
		}
    }
}