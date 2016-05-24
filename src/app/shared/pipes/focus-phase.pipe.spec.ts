import {
  it,
  describe,
  expect,
  inject,
  beforeEachProviders
} from '@angular/core/testing';
import { FocusPhasePipe } from './focus-phase.pipe';

describe('FocusPhase Pipe', () => {
  beforeEachProviders(() => [FocusPhasePipe]);

  it('should transform the input', inject([FocusPhasePipe], (pipe: FocusPhasePipe) => {
      expect(pipe.transform(true)).toBe(null);
  }));
});
