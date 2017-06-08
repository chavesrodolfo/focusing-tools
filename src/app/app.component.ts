import { environment } from './../environments/environment';
import { Component, ChangeDetectionStrategy, ViewChild, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { MdSidenav } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/startWith';

import { AuthService } from './common/core/services/auth.service';

const desktopBreak = 959;

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
    this.profileImg = this.authService.user.map(user => user ? user.photoURL : '/assets/images/icon.svg');
    this.sidenav.onClose.subscribe(i => this.getViewport().width > desktopBreak ? this.sidenav.open() : null);
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
      if (width <= desktopBreak) {
        this.sidenav.close();
      }
    }
  }

  setNav() {
    const viewport = this.getViewport();
    if (viewport.width > desktopBreak) {
      this.sidenav.mode = 'push';
      this.sidenav.open();
    } else {
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
