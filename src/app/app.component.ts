import { environment } from './../environments/environment';
import { Component, ChangeDetectionStrategy, ViewChild, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { AuthService } from './common/core/services/auth.service';

const desktopBreak = 959;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;
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

  share() {
    if ((navigator as any).share) {
      (navigator as any).share({
        title: document.title,
        text: 'Checkout https://focusing.tools a helpful app for focusing and getting things done!',
        url: 'https://focusing.tools'
      }).then(() => console.log('Successful share'))
        .catch(error => console.log('Error sharing:', error));
    } else {
      // tslint:disable-next-line
      window.open('https://twitter.com/home?status=Checkout%20https%3A//focusing.tools%20a%20helpful%20app%20for%20focusing%20and%20getting%20things%20done!', '_blank');
    }
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
