import { Component } from '@angular/core';
import { OverviewFields } from 'src/assets/data/keys/overview-data.keys';
import { NumericFields } from 'src/assets/data/keys/numeric-data.keys';

@Component({
  selector: 'app-seven-day-summary',
  templateUrl: './seven-day-summary.component.html',
  styleUrls: ['./seven-day-summary.component.scss']
})
export class SevenDaySummaryComponent {
  OverviewFields =  OverviewFields;
  NumericFields = NumericFields;
}
