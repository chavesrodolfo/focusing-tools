import { provideRouter, RouterConfig } from '@angular/router';

import { AboutComponent } from './about';
import { HomeComponent } from './home';
import { StatsComponent } from './stats';

export const routes: RouterConfig = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'stats', component: StatsComponent }
];
