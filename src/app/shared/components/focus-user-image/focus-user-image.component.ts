import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-focus-user-image',
  templateUrl: 'focus-user-image.component.html',
  styleUrls: ['focus-user-image.component.css'],
  inputs: ['authUser']
})
export class FocusUserImageComponent implements OnInit {
  authUser: any;
  constructor() {}

  ngOnInit() {
  }
}
