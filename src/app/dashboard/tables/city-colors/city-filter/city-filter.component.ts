import { Component, EventEmitter, Input, Output } from '@angular/core';
import { cityHealthColorsFields } from 'src/assets/data/keys/city-health-colors.keys';


interface FilterCity {
  englishName: string;
  hebrewName: string; 
}
@Component({
  selector: 'app-city-filter',
  templateUrl: './city-filter.component.html',
  styleUrls: ['./city-filter.component.scss']
})
export class CityFilterComponent {
  @Input() cities: FilterCity[] = [];
  @Output() filterChanged = new EventEmitter<string[]>();
  cityHealthColorsFields = cityHealthColorsFields;
  currenLabel: string | null = null;

  
  isOpen = false;
  searchTerm = '';
  selectedCity: string | null = null;

  get filteredCities(): FilterCity[] {
    return this.cities.filter(city =>
      city.englishName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      city.hebrewName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
    this.searchTerm = '';
  }

  selectCity(city: FilterCity) {
    this.selectedCity = city.englishName;
  }

  applyFilter() {
    if (this.selectedCity) {
      this.filterChanged.emit([this.selectedCity]);
    }
    this.closeDropdown();
    if (!this.currenLabel && this.selectedCity) {
       this.currenLabel = this.selectedCity; 
    }
  }

  cancelFilter() {
    this.selectedCity = null;
    this.filterChanged.emit([]);
    this.closeDropdown();
    this.currenLabel = null;
  }

  closeDropdown() {
    this.isOpen = false;
    this.searchTerm = '';
  }
}
