import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { cityHealthColorsFields } from 'src/assets/data/keys/city-health-colors.keys';
import { TranslationService } from 'src/app/core/services/translation.service';

interface CityHealthData {
  name: string; // באנגלית
  newCasesPer10k: number;
  positivityPercent: number;
  changeRate: number;
  currentSick: number;
  grade: number;
  translatedName?: string; // נוסיף את זה ידנית מאוחר יותר
}

type SortField = keyof CityHealthData | 'translatedName';
type SortDirection = 'asc' | 'desc' | null;

@Component({
  selector: 'app-cities-colors',
  templateUrl: './cities-colors.component.html',
  styleUrls: ['./cities-colors.component.scss']
})
export class CitiesColorsComponent implements OnInit {
  cityData: CityHealthData[] = [];
  displayedData: CityHealthData[] = [];
  cityHealthColorsFields = cityHealthColorsFields;

  currentSortField: SortField | null = null;
  currentSortDirection: SortDirection = null;

  constructor(
    private http: HttpClient,
    private translationService: TranslationService
  ) {}

  ngOnInit(): void {
  this.http.get<CityHealthData[]>('assets/data/israeli_city_health_data.json')
    .subscribe(data => {
      this.cityData = data;
      this.updateDisplayedData();
    });
  }

  onFilterChange(filteredCities: string[]): void {
    if (filteredCities.length === 0) {
      this.displayedData = this.cityData;
    }
    else{
      this.displayedData = this.cityData.filter(city => filteredCities.includes(city.name));
    }
  }

  getCityLabel(city: string): string {
    return cityHealthColorsFields[city as keyof typeof cityHealthColorsFields] || city;
  }

  getRowColor(grade: number): string {
    if (grade >= 7.5) return 'green-bg';
    if (grade >= 5) return 'yellow-bg';
    if (grade >= 3) return 'orange-bg';
    return 'red-bg';
  }

  sortBy(field: SortField): void {
    if (this.currentSortField === field) {
      this.currentSortDirection = this.getNextDirection(this.currentSortDirection);
    } else {
      this.currentSortField = field;
      this.currentSortDirection = 'asc';
    }

    this.updateDisplayedData();
  }

  private getNextDirection(current: SortDirection): SortDirection {
    switch (current) {
      case null: return 'asc';
      case 'asc': return 'desc';
      case 'desc': return null;
    }
  }

  private updateDisplayedData(): void {
  // נתרגם מחדש כל עיר לפי השפה הנוכחית
  const translated = this.cityData.map(city => ({
    ...city,
    translatedName: this.translationService.getTranslation(`cityTable.${city.name}`)
  }));

  this.displayedData = this.sortData(translated);
}

  private sortData(data: CityHealthData[]): CityHealthData[] {
    if (!this.currentSortField || !this.currentSortDirection) {
      return [...data];
    }

    return [...data].sort((a, b) => {
      const aVal = a[this.currentSortField!];
      const bVal = b[this.currentSortField!];

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

  getSortSymbol(field: SortField): string {
    if (this.currentSortField !== field) return '';
    if (this.currentSortDirection === 'asc') return '▾';
    if (this.currentSortDirection === 'desc') return '▴';
    return '';
  }
}
