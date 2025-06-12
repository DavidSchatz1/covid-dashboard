import { Component, OnInit } from '@angular/core';
import { HospitalData, hospitalBedOccupancyData } from 'src/assets/data/tablesData/bed-occupancy.data';
import { hospitalTableFields } from 'src/assets/data/keys/hospitalTable.keys';
import { TranslationService } from 'src/app/core/services/translation.service';

type SortField = keyof HospitalData;
type SortDirection = 'asc' | 'desc' | null;

interface FilterHospitalData {
  name: string;      
  hebrewName: string;
}

@Component({
  selector: 'app-hospital-occupancy-table',
  templateUrl: './hospital-occupancy-table.component.html',
  styleUrls: ['./hospital-occupancy-table.component.scss']
})
export class HospitalOccupancyTableComponent implements OnInit {
  allHospitals: HospitalData[] = hospitalBedOccupancyData;
  visibleHospitals: HospitalData[] = [];
  hospitalTableFields = hospitalTableFields;
  hospitalsForFilterComponent: FilterHospitalData[] = [];

  allHospitalNames: string [] = [];
  selectedHospitalNames: string[] = [];

  currentSortField: SortField | null = null;
  currentSortDirection: SortDirection = null;

  constructor(private translationService: TranslationService) { }

  ngOnInit(): void {
    this.allHospitalNames = this.allHospitals.map(h => h.nameKey); 
    this.selectedHospitalNames = [...this.allHospitalNames];
    this.updateVisibleHospitals();
  }

  onFilterChanged(selectedNames: string[]): void {
    this.selectedHospitalNames = selectedNames;
    this.updateVisibleHospitals();
  }

  sortBy(field: SortField): void {
    if (this.currentSortField === field) {
      this.currentSortDirection = this.getNextDirection(this.currentSortDirection);
    } else {
      this.currentSortField = field;
      this.currentSortDirection = 'asc';
    }

    this.updateVisibleHospitals();
  }

  private updateVisibleHospitals(): void {
  const filtered = this.allHospitals.filter(h =>
    this.selectedHospitalNames.includes(h.nameKey)
  );

  const translated = filtered.map(hospital => ({
    ...hospital,
    translatedName: this.translationService.getTranslation(`HospitalTable.${hospital.nameKey}`)
  }));

  this.visibleHospitals = this.sortHospitals(translated);
}


  private sortHospitals(hospitals: HospitalData[]): HospitalData[] {
  if (!this.currentSortField || !this.currentSortDirection) {
    return [...hospitals];
  }

  return [...hospitals].sort((a: any, b: any) => {
    let aVal = a[this.currentSortField!];
    let bVal = b[this.currentSortField!];

    if (this.currentSortField === 'nameKey') {
      aVal = a.translatedName || '';
      bVal = b.translatedName || '';
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
    }
  }

  getSortSymbol(field: SortField): string {
    if (this.currentSortField !== field) return '';
    if (this.currentSortDirection === 'asc') return '▾';
    if (this.currentSortDirection === 'desc') return '▴';
    return '';
  }

  getBarWidth(value: number): string {
  return Math.min(value, 100) + '%';
}

getBarColor(value: number): string {
  return value <= 100 ? '#3f51b5' : '#d32f2f';
}
}
