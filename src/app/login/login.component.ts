import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthType } from '../interfaces/interfaces';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.authService.authUser.subscribe(user => {
      if(user) {
        this.router.navigate(['/stats']);
      }
    })
  }

  loginTwitter() {
    this.authService.login(AuthType.TWITTER);
  }

  loginGithub() {
    this.authService.login(AuthType.GITHUB);
  }
}
