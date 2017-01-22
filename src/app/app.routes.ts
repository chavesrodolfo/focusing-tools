import { Routes } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { StatsComponent } from './stats/stats.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './app.guards';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'stats', component: StatsComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent }
];
