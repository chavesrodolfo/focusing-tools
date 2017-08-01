import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimerComponent } from './components/timer/timer.component';
import { CarbonAdComponent } from './components/carbon-ad/carbon-ad.component';

const components = [
  TimerComponent,
  CarbonAdComponent
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ...components
  ],
  exports: [
    ...components,
    CommonModule,
    RouterModule,
    HttpModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
