import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { NavbarComponent } from './layout/navbar/navbar/navbar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'covid-dashboard';

@ViewChild('sectionsContainer', { read: ElementRef }) sectionsContainer!: ElementRef;

  sectionElements: HTMLElement[] = [];

  ngAfterViewInit() {
    this.sectionElements = Array.from(this.sectionsContainer.nativeElement.children);
  }}
