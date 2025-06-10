import { Component, Input, OnInit } from '@angular/core';
import { NumericDataService } from 'src/app/core/services/numeric-data.service';
import { TranslationService } from 'src/app/core/services/translation.service';
import { OverviewField } from 'src/assets/data/keys/overview-data.keys';
import { NumericField } from 'src/assets/data/keys/numeric-data.keys';

@Component({
  selector: 'app-overview-card',
  templateUrl: './overview-card.component.html',
  styleUrls: ['./overview-card.component.scss']
})
export class OverviewCardComponent implements OnInit {
  data: any;
  @Input() field!: OverviewField;
  OverviewField =  OverviewField;
  numericField = NumericField;
  yourInfoString: string = 'מספר המאומתים לנגיף COVID-19 שאותרו משעה 00:00 עד שעה 23:59 של יום אתמול. סה"כ: מספר המאומתים מפרוץ המגיפה, כולל מי שהתגלו כמאומתים לנגיף שוב. מאומתים - מי שנבדקו ונמצאו חיוביים לנגיף COVID-19 בבדיקת PCR או בבדיקת אנטיגן מפוקחת (החל מה 5.1.2022) , בין אם הופיעו אצלם תסמינים ובין אם לא, בין אם הם חולים, החלימו או נפטרו. מדד המאומתים מושפע מכמות האנשים שעושים בדיקה מוסדית על כן עלול לא לשקף את רמות התחלואה האמיתיות';

  constructor(public numericData: NumericDataService, public translation: TranslationService) {}

  ngOnInit(): void {
    this.numericData.getValue$(this.field).subscribe(data => {
      this.data = data;
    });
  }

  originalOrder = () => 0; //שומר על סדר הקריאה מהאובייקט כדי שכל שורה תופיע במקום הנכון
}

