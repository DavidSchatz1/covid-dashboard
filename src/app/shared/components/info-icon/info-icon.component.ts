import { Component, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-info-icon',
  templateUrl: './info-icon.component.html',
  styleUrls: ['./info-icon.component.scss']
})
export class InfoIconComponent {
  @Input() infoText: string = '';
  @ViewChild('tooltipContent') tooltipContentRef!: ElementRef;

  isTooltipVisible: boolean = false;

  constructor() {}


  showTooltip(): void {
    this.isTooltipVisible = true;
    setTimeout(() => {
      this.adjustTooltipPosition();
    }, 50); 
  }

  hideTooltip(): void {
    this.isTooltipVisible = false;
  }

  adjustTooltipPosition(): void {
    if (!this.tooltipContentRef || !this.tooltipContentRef.nativeElement) {
      return;
    }

    const tooltipElement = this.tooltipContentRef.nativeElement;
    const tooltipRect = tooltipElement.getBoundingClientRect();
    const viewportWidth = window.innerWidth || document.documentElement.clientWidth;

    let newLeft = 0; 

    if (tooltipRect.right > viewportWidth) {
      newLeft = -(tooltipRect.right - viewportWidth + 30); 
      tooltipElement.style.left = `${newLeft}px`;
    } 
    else if (tooltipRect.left < 0) {
      newLeft = -tooltipRect.left + 30;
      tooltipElement.style.left = `${newLeft}px`;
    }
  }
}


