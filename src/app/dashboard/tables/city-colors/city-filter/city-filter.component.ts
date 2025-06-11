import { Component, EventEmitter, Input, Output } from '@angular/core';
import { cityHealthColorsFields } from 'src/assets/data/keys/city-health-colors.keys';

@Component({
  selector: 'app-city-filter',
  templateUrl: './city-filter.component.html',
  styleUrls: ['./city-filter.component.scss']
})
export class CityFilterComponent {
  @Input() cities: { name: string }[] = [];
  @Output() filterChanged = new EventEmitter<string[]>();
  cityHealthColorsFields = cityHealthColorsFields;
  currenLabel: string | null = null;

  
  isOpen = false;
  searchTerm = '';
  selectedCity: string | null = null;

  get filteredCities() {
  return this.cities.filter(city =>
    city.name.toLowerCase().includes(this.searchTerm.toLowerCase())
  );
}

  toggleDropdown() {
    this.isOpen = !this.isOpen;
    this.searchTerm = '';
  }

  selectCity(city: string) {
    this.selectedCity = city;
  }

  applyFilter() {
    if (this.selectedCity) {
      this.filterChanged.emit([this.selectedCity]);
    }
    this.closeDropdown();
    this.currenLabel = this.selectedCity;
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
