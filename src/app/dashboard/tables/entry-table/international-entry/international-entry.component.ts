import { Component, OnInit } from '@angular/core';
import { InternationalEntryData, internationalEntriesByTimeRange } from 'src/assets/data/tablesData/InternationalEntry.data';
import { InternationalEntryFields } from 'src/assets/data/keys/internationalEntry.keys';
import { TranslationService } from 'src/app/core/services/translation.service'; // וודא שהנתיב נכון לסרוויס שלך
import { timeRange } from './entry-filter/entry-filter.component';

type SortField = keyof InternationalEntryData;
type SortDirection = 'asc' | 'desc' | null;

@Component({
  selector: 'app-international-entries-table',
  templateUrl: './international-entry.component.html',
  styleUrls: ['./international-entry.component.scss']
})
export class InternationalEntryComponent implements OnInit {
  // נתוני המקור המלאים - לא משתנים בסינון/מיון
  chosenTimeRange: timeRange = 'last month';
  allEntries: InternationalEntryData[] = internationalEntriesByTimeRange[this.chosenTimeRange];
  allCountryNames: string[] = this.allEntries.map(entry => entry.country);
  // הנתונים שמוצגים בפועל בטבלה לאחר סינון/מיון
  visibleEntries: InternationalEntryData[] = [];
  selectedCountryNames: string[] = [];
  

  internationalEntryFields = InternationalEntryFields;

  // משתני מצב המיון הנוכחיים
  currentSortField: SortField | null = null;
  currentSortDirection: SortDirection = null;

  tableColumns: { field: SortField; headerKey: InternationalEntryFields }[] = [
    { field: 'country', headerKey: InternationalEntryFields.country },
    { field: 'incoming', headerKey: InternationalEntryFields.incomingTravelers },
    { field: 'verifiedCitizens', headerKey: InternationalEntryFields.verifiedCitizens },
    { field: 'verifiedForeigners', headerKey: InternationalEntryFields.verifiedForeigners },
    { field: 'percentageVerified', headerKey: InternationalEntryFields.percentageOfVerified },
    { field: 'riskColor', headerKey: InternationalEntryFields.riskLevel }
  ];

  constructor(private translationService: TranslationService) { }

  ngOnInit(): void {
    this.updateDataSource();
    this.selectedCountryNames = [...this.allEntries.map(entry => entry.country)];
    this.updateVisibleEntries();
  }

  private updateDataSource(): void {
  this.allEntries = internationalEntriesByTimeRange[this.chosenTimeRange] || [];
}

  onFilterChanged(selectedNames: string[]): void {
    this.selectedCountryNames = selectedNames;
    this.updateVisibleEntries();
  }

  onTimeRangeChanged(newTimeRange: timeRange): void {
  this.chosenTimeRange = newTimeRange;
  this.updateDataSource();
  this.selectedCountryNames = [...this.allEntries.map(entry => entry.country)];
  this.updateVisibleEntries();
}


  sortBy(field: SortField): void {
    if (this.currentSortField === field) {
      // אם לוחצים על אותה עמודה, משנה את כיוון המיון (עולה -> יורד -> ללא מיון)
      this.currentSortDirection = this.getNextDirection(this.currentSortDirection);
    } else {
      // אם לוחצים על עמודה חדשה, מגדיר אותה כשדה המיון ומתחיל ממיון עולה (asc)
      this.currentSortField = field;
      this.currentSortDirection = 'asc';
    }

    // מעדכן את הנתונים המוצגים בטבלה בהתאם למיון החדש
    this.updateVisibleEntries();
  }

  private updateVisibleEntries(): void {
    // שלב 1: (כאן יהיה מקום לסינון, אך כרגע אין פילטר חיצוני, אז ניקח את כל הנתונים)
    const filtered = this.allEntries.filter(entry => 
      this.selectedCountryNames.includes(entry.country)
    )

   // שלב 2: הוספת שדה מתורגם למדינות לצורך מיון ו/או הצגה
    const translated = filtered.map(entry => ({
      ...entry,
      // מוסיף שדה translatedCountry כדי למיין לפי השם המתורגם
      translatedCountry: this.translationService.getTranslation(`InternationalEntry.${entry.country}`)
    }));

    // שלב 3: מיון הנתונים המסוננים והמתורגמים
    this.visibleEntries = this.sortEntries(translated);
  }


  private sortEntries(entries: InternationalEntryData[] & { translatedCountry?: string }[]): InternationalEntryData[] {
    if (!this.currentSortField || !this.currentSortDirection) {
      // אם אין שדה מיון או כיוון, מחזיר עותק לא ממוין
      return [...entries];
    }

    return [...entries].sort((a: any, b: any) => {
      let aVal = a[this.currentSortField!];
      let bVal = b[this.currentSortField!];

      // טיפול מיוחד במיון לפי מדינה (country) - משתמש בשם המתורגם
      if (this.currentSortField === 'country') {
        aVal = a.translatedCountry || '';
        bVal = b.translatedCountry || '';
      }
      // טיפול מיוחד במיון לפי רמת סיכון (riskColor)
      else if (this.currentSortField === 'riskColor') {
        // הגדרת סדר העדיפויות עבור רמות הסיכון
        const riskOrder: { [key: string]: number } = {
          'red': 3,
          'yellow': 2,
          'green': 1
        };
        const aRisk: number = riskOrder[aVal] || 0; // אם ערך לא מוכר, יחשב כ-0
        const bRisk: number = riskOrder[bVal] || 0; // אם ערך לא מוכר, יחשב כ-0

        return this.currentSortDirection === 'asc'
          ? aRisk - bRisk // מיון עולה: ירוק, צהוב, אדום (1, 2, 3)
          : bRisk - aRisk; // מיון יורד: אדום, צהוב, ירוק (3, 2, 1)
      }


      // השוואת מחרוזות (כולל שמות מדינות מתורגמים)
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return this.currentSortDirection === 'asc'
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }

      // השוואת מספרים
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return this.currentSortDirection === 'asc'
          ? aVal - bVal
          : bVal - aVal;
      }

      // במקרה שלא ניתן למיין (לדוגמה, סוגי נתונים שונים), לא משנה את הסדר
      return 0;
    });
  }

 
  private getNextDirection(current: SortDirection): SortDirection {
    switch (current) {
      case null: return 'asc';
      case 'asc': return 'desc';
      case 'desc': return null;
      default: return null; // למקרה בלתי צפוי
    }
  }

 
  getSortSymbol(field: SortField): string {
    if (this.currentSortField !== field) return '';
    if (this.currentSortDirection === 'asc') return '▾';
    if (this.currentSortDirection === 'desc') return '▴';
    return '';
  }

  getPercentageText(value: number): string {
    return value.toFixed(2) + '%';
  }

  getRiskColorClass(color: string): string {
    return `risk-${color}`;
  }
}