import { Pipe, PipeTransform } from '@angular/core';
import { Subscription } from 'rxjs';
import { NumericDataService } from '../../core/services/numeric-data.service';

@Pipe({
  name: 'NumericDataPipe',
  pure: false
})
export class NumericDataPipe implements PipeTransform {
  private lastValue: number = NaN;
  private lastKey: string = '';
  private sub?: Subscription;

  constructor(private numericDataService: NumericDataService) {}

  transform(key: string): string {
    if (this.lastKey !== key) {
      this.lastKey = key;
      this.sub?.unsubscribe();
      this.sub = this.numericDataService.getValue$(key).subscribe(value => {
        this.lastValue = value;
      });
    }
    if (typeof this.lastValue === 'number') {
      return new Intl.NumberFormat().format(this.lastValue);
    }

    return '';
  }
}

