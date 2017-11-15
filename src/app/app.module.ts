import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatIconModule, MatToolbarModule,
  MatSidenavModule, MatMenuModule, MatCheckboxModule, MatRadioModule, MatSelectModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import 'hammerjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/startWith';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './common/shared/shared.module';
import { CoreModule } from './common/core/core.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { HistoryComponent } from './history/history.component';
import { MeditateComponent } from './meditate/meditate.component';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    LoginComponent,
    HistoryComponent,
    MeditateComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    NgxChartsModule,
    AppRoutingModule,
    CoreModule.forRoot(),
    SharedModule,

    // Material
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatMenuModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
