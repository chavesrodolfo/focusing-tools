import { Component, OnInit } from '@angular/core';

import { FocusPhasePipe } from '../../../shared';
import { PhaseType } from '../../../interfaces/interfaces';

@Component({
  moduleId: module.id,
  selector: 'app-focus-phase',
  templateUrl: 'focus-phase.component.html',
  styleUrls: ['focus-phase.component.css']
})
export class FocusPhaseComponent implements OnInit {
  focusPhase: any;

  constructor() { }

  ngOnInit() {
  }
}
