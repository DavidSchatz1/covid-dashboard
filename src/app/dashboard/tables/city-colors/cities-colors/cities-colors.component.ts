import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { cityHealthColorsFields } from 'src/assets/data/keys/city-health-colors.keys';
import { TranslationService } from 'src/app/core/services/translation.service';

interface CityHealthData {
  name: string;
  newCasesPer10k: number;
  positivityPercent: number;
  changeRate: number;
  currentSick: number;
  grade: number;
  translatedName?: string;
}

type SortField = keyof CityHealthData | 'translatedName';
type SortDirection = 'asc' | 'desc' | null;
interface ColorItem {
    cssClass: 'red' | 'orange' | 'yellow' | 'green';
    fieldKey: 'Red' | 'Orange' | 'Yellow' | 'Green';
    explanationKey: 'RedExplanation' | 'OrangeExplanation' | 'YellowExplanation' | 'GreenExplanation';
  }
interface FilterCityData {
  englishName: string;
  hebrewName: string;
}

@Component({
  selector: 'app-cities-colors',
  templateUrl: './cities-colors.component.html',
  styleUrls: ['./cities-colors.component.scss']
})
export class CitiesColorsComponent implements OnInit {
  cityData: CityHealthData[] = [];
  displayedData: CityHealthData[] = [];
  cityHealthColorsFields = cityHealthColorsFields;
  filterCitiesData: FilterCityData[] = [];


  currentSortField: SortField | null = null;
  currentSortDirection: SortDirection = null;

  colors: ColorItem[] = [
    { cssClass: 'red', fieldKey: 'Red', explanationKey: 'RedExplanation' },
    { cssClass: 'orange', fieldKey: 'Orange', explanationKey: 'OrangeExplanation' },
    { cssClass: 'yellow', fieldKey: 'Yellow', explanationKey: 'YellowExplanation' },
    { cssClass: 'green', fieldKey: 'Green', explanationKey: 'GreenExplanation' },
  ]

  constructor(
    private http: HttpClient,
    private translationService: TranslationService
  ) {}

  ngOnInit(): void {
  this.http.get<CityHealthData[]>('assets/data/israeli_city_health_data.json')
    .subscribe(data => {
      this.cityData = data;
      this.prepareFilterData();

      this.updateDisplayedData();
    });
  }

  private prepareFilterData(): void {
    this.filterCitiesData = this.cityData.map(city => ({
      englishName: city.name,
      hebrewName: this.translationService.getTranslation(`cityTable.${city.name}`) || city.name
    }));
  }
  onFilterChange(filteredCities: string[]): void {
    if (filteredCities.length === 0) {
      this.displayedData = this.cityData;
    }
    else{
      this.displayedData = this.cityData.filter(city => filteredCities.includes(city.name));
    }
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
