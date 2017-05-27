import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule, DatePipe} from '@angular/common';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { environment } from './../../../environments/environment';
import { AuthService } from './services/auth.service';
import { TimerService } from './services/timer.service';
import { HistoryService } from './services/history.service';
import { NotificationService } from './services/notification.service';
import { AuthGuard } from './route-guards';

@NgModule({
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  declarations: []
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        DatePipe,
        AuthGuard,
        AuthService,
        TimerService,
        NotificationService,
        HistoryService
      ]
    };
  }
}
