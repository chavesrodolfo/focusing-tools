import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { MeditateComponent } from './meditate/meditate.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { HistoryComponent } from './history/history.component';
import { SettingsComponent } from './settings/settings.component';
import { AuthGuard } from './common/core/route-guards';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'meditate', component: MeditateComponent },
  { path: 'about', component: AboutComponent },
  { path: 'history', component: HistoryComponent, canActivate: [AuthGuard] },
  { path: 'settings', component: SettingsComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
