import { Component, OnInit } from '@angular/core';
import { OverviewField } from 'src/assets/data/keys/overview-data.keys';
import { NumericField } from 'src/assets/data/keys/numeric-data.keys';

@Component({
  selector: 'app-seven-day-summary',
  templateUrl: './seven-day-summary.component.html',
  styleUrls: ['./seven-day-summary.component.scss']
})
export class SevenDaySummaryComponent implements OnInit {
  OverviewField =  OverviewField;
  NumericField = NumericField;

  constructor() { }

  ngOnInit(): void {
  }

}
