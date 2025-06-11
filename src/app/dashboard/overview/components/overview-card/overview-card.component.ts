import { Component, Input, OnInit } from '@angular/core';
import { NumericDataService } from 'src/app/core/services/numeric-data.service';
import { TranslationService } from 'src/app/core/services/translation.service';
import { OverviewFields } from 'src/assets/data/keys/overview-data.keys';
import { NumericFields } from 'src/assets/data/keys/numeric-data.keys';

@Component({
  selector: 'app-overview-card',
  templateUrl: './overview-card.component.html',
  styleUrls: ['./overview-card.component.scss']
})
export class OverviewCardComponent implements OnInit {
  data: any;
  @Input() field!: OverviewFields;
  OverviewField =  OverviewFields;
  numericField = NumericFields;

  constructor(public numericData: NumericDataService, public translation: TranslationService) {}

  ngOnInit(): void {
    this.numericData.getValue$(this.field).subscribe(data => {
      this.data = data;
    });
  }

  originalOrder = () => 0;
}

