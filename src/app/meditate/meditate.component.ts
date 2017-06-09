import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Howl } from 'howler';

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
export class MeditateComponent implements OnInit {
  meditateForm: FormGroup;
  sound: any;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.meditateForm = this.formBuilder.group({
      audioType: ['rain'],
      time: [10]
    });
  }

  submit() {
    if (this.sound && this.sound.stop) {
      this.sound.stop();
    }

    this.sound = new Howl({
      src: [`${sounds.basePath}${sounds[this.meditateForm.controls.audioType.value].path}`],
      autoplay: true,
      loop: true,
      volume: 0.5,
    });
  }

  stop() {
    this.sound.stop();
  }
}
