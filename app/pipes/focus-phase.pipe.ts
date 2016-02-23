import {Pipe} from 'angular2/core';

@Pipe({
    name: 'phasetype'
})
export class FocusPhasePipe {
    transform(val, args) {
		switch(val) {
			case 0:
				return 'Pomodoro';
			case 1:
				return 'Short Break';
			case 2: 
				return 'Long Break';
			default:
				return 'Error';
		}
    }
}