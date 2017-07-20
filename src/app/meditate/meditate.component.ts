import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Howl } from 'howler';

import { SettingsService } from './../common/core/services/settings.service';

const sounds = {
  basePath: 'assets/audio/',
  rain: { path: 'rain.mp3', volume: 0.5 },
  ocean: { path: 'ocean.mp3', volume: 0.5 },
  outdoors: { path: 'outdoors.mp3', volume: 1 },
  whiteNoise: { path: 'white-noise.mp3', volume: 0.5 }
};

@Component({
  selector: 'app-meditate',
  templateUrl: './meditate.component.html',
  styleUrls: ['./meditate.component.scss']
})
export class MeditateComponent implements OnInit, OnDestroy {
  meditateForm: FormGroup;
  sound: {};
  audioTypeSubscription: Subscription;

  constructor(
    private settingsService: SettingsService,
    private formBuilder: FormBuilder) { }


  ngOnInit() {
    this.sound = this.settingsService.settings.map(s => s.sound);
    this.meditateForm = this.formBuilder.group({
      audioType: ['rain'],
      time: [10]
    });

    this.audioTypeSubscription = this.meditateForm.controls.audioType.valueChanges.subscribe(() => {
      this.stop();
    });
  }

  ngOnDestroy() {
    this.audioTypeSubscription.unsubscribe();
  }

  submit() {
    this.settingsService.settings.first().subscribe(settings => {
      const soundType = this.meditateForm.controls.audioType.value;

      if (settings.soundType === soundType) {
        this.stop();
      } else if (settings.soundType !== soundType) {
        if (settings.sound && settings.sound.stop) {
          settings.sound.stop();
        }

        const sound = new Howl({
          src: [`${sounds.basePath}${sounds[soundType].path}`],
          autoplay: true,
          loop: true,
          volume: 0.5,
        });

        this.settingsService.updateSettings({ soundType, sound });
      }
    });
  }

  stop() {
    this.settingsService.settings.first().subscribe(settings => {
      if (settings.sound !== null) {
        settings.sound.stop();
        this.settingsService.updateSettings({ soundType: null, sound: null });
      }
    });
  }
}
