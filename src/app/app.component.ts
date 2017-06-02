import { environment } from './../environments/environment';
import { Component, ChangeDetectionStrategy, ViewChild, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { MdSidenav } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/startWith';

import { AuthService } from './common/core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MdSidenav;
  isLoggedIn: Observable<boolean>;
  profileImg: Observable<string>;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.setNav();
    this.isLoggedIn = this.authService.isLoggedIn;
    this.profileImg = this.authService.user.map(user => user ? user.photoURL : '/assets/images/icon.png');
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.setNav();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }

  closeNav() {
    if (typeof window !== 'undefined') {
      const width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
      if (width < 960) {
        this.sidenav.close();
      }
    }
  }

  setNav() {
    const viewport = this.getViewport();
    if (viewport.width > 959) {
      console.log('open');
      this.sidenav.mode = 'push';
      this.sidenav.open().then(i => console.log(i));
    } else {
      console.log('close');
      this.sidenav.mode = 'over';
      this.sidenav.close();
    }
  }

  private getViewport() {
    if (typeof window !== 'undefined') {
      const width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
      const height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
      return { width, height };
    } else {
      return { width: 1400, height: 1024 };
    }
  }
}
