import { Component, Input, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';
import { deathsFields } from 'src/assets/data/keys/deaths.keys';

@Component({
  selector: 'app-range-selector',
  templateUrl: './range-selector.component.html',
  styleUrls: ['./range-selector.component.scss']
})
export class RangeSelectorComponent {
  @Input() rangeOptions: { label: string; value: string }[] = [];
  @Input() currentRange: string = '';

  @Output() rangeChanged = new EventEmitter<string>();

  selectorOpen = false;
  tempRange: string = '';
  deathsFields = deathsFields;

  constructor(private eRef: ElementRef) {}

  toggleSelector(event: Event): void {
    event.stopPropagation();
    this.selectorOpen = !this.selectorOpen;
    if (this.selectorOpen) {
      this.tempRange = this.currentRange;
    }
  }

  selectTempRange(range: string, event: Event): void {
    event.stopPropagation();
    this.tempRange = range;
  }

  applyTempRange(event: Event): void {
    event.stopPropagation();
    this.selectorOpen = false;
    this.rangeChanged.emit(this.tempRange);
  }

  cancelTempRange(event: Event): void {
    event.stopPropagation();
    this.selectorOpen = false;
    this.tempRange = this.currentRange;
  }

  closeSelector(): void {
    this.selectorOpen = false;
    this.tempRange = this.currentRange;
  }

  getLabelForValue(value: string): string {
    const found = this.rangeOptions.find(opt => opt.value === value);
    return found ? found.label : '';
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (this.selectorOpen && !this.eRef.nativeElement.contains(event.target)) {
      this.closeSelector();
    }
  }
}
