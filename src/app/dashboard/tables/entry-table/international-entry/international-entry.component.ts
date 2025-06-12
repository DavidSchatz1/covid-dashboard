import { Component, OnInit } from '@angular/core';
import { InternationalEntryData, internationalEntriesByTimeRange } from 'src/assets/data/tablesData/InternationalEntry.data';
import { InternationalEntryFields } from 'src/assets/data/keys/internationalEntry.keys';
import { TranslationService } from 'src/app/core/services/translation.service';
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
      this.currentSortDirection = this.getNextDirection(this.currentSortDirection);
    } else {
      this.currentSortField = field;
      this.currentSortDirection = 'asc';
    }
    this.updateVisibleEntries();
  }

  private updateVisibleEntries(): void {
    const filtered = this.allEntries.filter(entry => 
      this.selectedCountryNames.includes(entry.country)
    )

    const translated = filtered.map(entry => ({
      ...entry,
      translatedCountry: this.translationService.getTranslation(`InternationalEntry.${entry.country}`)
    }));

    this.visibleEntries = this.sortEntries(translated);
  }


  private sortEntries(entries: InternationalEntryData[] & { translatedCountry?: string }[]): InternationalEntryData[] {
    if (!this.currentSortField || !this.currentSortDirection) {
      return [...entries];
    }

    return [...entries].sort((a: any, b: any) => {
      let aVal = a[this.currentSortField!];
      let bVal = b[this.currentSortField!];

      if (this.currentSortField === 'country') {
        aVal = a.translatedCountry || '';
        bVal = b.translatedCountry || '';
      }
      else if (this.currentSortField === 'riskColor') {
        const riskOrder: { [key: string]: number } = {
          'red': 3,
          'yellow': 2,
          'green': 1
        };
        const aRisk: number = riskOrder[aVal] || 0;
        const bRisk: number = riskOrder[bVal] || 0;

        return this.currentSortDirection === 'asc'
          ? aRisk - bRisk 
          : bRisk - aRisk;
      }

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return this.currentSortDirection === 'asc'
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return this.currentSortDirection === 'asc'
          ? aVal - bVal
          : bVal - aVal;
      }

      return 0;
    });
  }

 
  private getNextDirection(current: SortDirection): SortDirection {
    switch (current) {
      case null: return 'asc';
      case 'asc': return 'desc';
      case 'desc': return null;
      default: return null;
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