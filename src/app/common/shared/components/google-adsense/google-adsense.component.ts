import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-google-adsense',
  templateUrl: './google-adsense.component.html',
  styleUrls: ['./google-adsense.component.scss']
})
export class GoogleAdsenseComponent implements OnInit, AfterViewInit {
  constructor(private elementRef: ElementRef) {
  }

  ngAfterViewInit() {
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = '//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
    this.elementRef.nativeElement.appendChild(s);
    ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
  }

  ngOnInit() {
  }
}
