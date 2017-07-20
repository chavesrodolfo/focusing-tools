import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimerComponent } from './components/timer/timer.component';
import { GoogleAdsenseComponent } from './components/google-adsense/google-adsense.component';

const components = [
  TimerComponent,
  GoogleAdsenseComponent
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
