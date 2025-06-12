import { Component, ElementRef, ViewChild } from '@angular/core';

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
  }
}
