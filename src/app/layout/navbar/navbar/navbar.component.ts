import { Input, OnInit, ViewChild } from '@angular/core';
import { AnchorFields } from 'src/assets/data/keys/navbar-data.keys';
import { Component, HostListener, ElementRef, AfterViewInit } from '@angular/core';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, AfterViewInit {
  AnchorFields = AnchorFields;
  @Input() sections: HTMLElement[] = [];
  activeSection: string = '';
  @ViewChild('navbar', { static: true }) navbar!: ElementRef;

  
  ngOnInit(): void {
    this.onScroll(); // Initial check
  }

  ngAfterViewInit() {
    this.onScroll(); // Initial call to set the active section
  }

  @HostListener('window:scroll', [])
onScroll() {
  if (!this.sections) return;

  const scrollPosition = window.scrollY + 200;

  this.sections.forEach((element: HTMLElement) => {
    if (element.offsetTop <= scrollPosition && (element.offsetTop + element.offsetHeight) > scrollPosition) {
      this.activeSection = element.id;

      const activeElement = this.navbar.nativeElement.querySelector('.active');
      if (activeElement) {
          // 3️⃣ Scroll horizontally to bring the active item into view
          activeElement.scrollIntoView({
            behavior: 'smooth',
            inline: 'center', // Center it horizontally
            block: 'nearest' // Prevent vertical scrolling
          });
        }
     }
    });
  }
}

