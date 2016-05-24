import { Component, OnInit } from '@angular/core';
import { PhaseType } from '../../../interfaces/interfaces';
import { FocusPhasePipe } from '../../pipes/focus-phase.pipe';

@Component({
  moduleId: module.id,
  selector: 'app-focus-phase',
  templateUrl: 'focus-phase.component.html',
  styleUrls: ['focus-phase.component.css']
})
export class FocusPhaseComponent implements OnInit {
  focusPhase: any;
  
  constructor() {}

  ngOnInit() {
  }
}
