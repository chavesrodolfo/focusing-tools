import { Component, OnInit } from '@angular/core';

import { FocusPhasePipe } from '../../../shared/pipes/focus-phase.pipe';
import { PhaseType } from '../../../interfaces/interfaces';

@Component({
  selector: 'app-focus-phase',
  templateUrl: './focus-phase.component.html',
  styleUrls: ['./focus-phase.component.scss']
})
export class FocusPhaseComponent implements OnInit {
  focusPhase: any;

  constructor() { }

  ngOnInit() {
  }
}
