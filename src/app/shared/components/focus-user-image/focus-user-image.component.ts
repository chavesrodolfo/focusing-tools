import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-focus-user-image',
  templateUrl: './focus-user-image.component.html',
  styleUrls: ['./focus-user-image.component.scss']
})
export class FocusUserImageComponent implements OnInit {
  @Input() authUser: any;
  constructor() {}

  ngOnInit() {
  }
}
