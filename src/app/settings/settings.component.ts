import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { State as AppSettings } from './../common/core/store/settings/state';
import { NotificationService } from './../common/core/services/notification.service';
import { SettingsService } from './../common/core/services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  settings: Observable<AppSettings>;
  settingsForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private settingsService: SettingsService) { }

  ngOnInit() {
    this.settings = this.settingsService.settings;
    this.settingsForm = this.getForm();
    this.loadSettings();
    this.listenToFormChanges();
  }

  enableNotifications() {
    this.notificationService.requestPermission();
  }

  private listenToFormChanges() {
    this.settingsForm.valueChanges.subscribe(values => {
      const settings = {
        soundEnabled: values.soundEnabled
      };

      this.settingsService.updateSettings(settings);
    });
  }

  private getForm() {
    return this.formBuilder.group({
      soundEnabled: [true]
    });
  }

  private loadSettings() {
    this.settingsService.settings.first().subscribe(settings =>
      this.settingsForm.controls.soundEnabled.setValue(settings.soundEnabled));
  }
}
