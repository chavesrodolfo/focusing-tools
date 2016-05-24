import { Pipe, PipeTransform } from '@angular/core';
import { PhaseType } from '../../interfaces/interfaces';

@Pipe({
  name: 'focusPhase'
})
export class FocusPhasePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    switch (value) {
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
