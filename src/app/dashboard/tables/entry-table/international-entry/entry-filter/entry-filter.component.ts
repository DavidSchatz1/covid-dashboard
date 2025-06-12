import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TranslationService } from 'src/app/core/services/translation.service';
import { InternationalEntryFields } from 'src/assets/data/keys/internationalEntry.keys';
import { forkJoin } from 'rxjs';

export type timeRange = 'last month' | 'last 3 months' | 'last 6 months' | 'last 1 year' | 'entire period';

@Component({
  selector: 'app-entry-filter',
  templateUrl: './entry-filter.component.html',
  styleUrls: ['./entry-filter.component.scss']
})
export class EntryFilterComponent implements OnInit {
  @Input() countryNames: string[] = [];
  @Output() selectionChanged = new EventEmitter<string[]>();
  @Output() timeRangeChanged = new EventEmitter<timeRange>();
  InternationalEntryFields = InternationalEntryFields;

  countryForFilter: { name: string; hebrewName: string; selected: boolean }[] = [];
  selectedCountries: string[] = [];
  searchTerm: string = '';
  isDropdownOpen: boolean = false;

  timeRangeChosen: timeRange = 'last month';
  isTimeRangeStep: boolean = true;

  timeRangeTranslationKeys: { [key in timeRange]: string } = {
    'last month': InternationalEntryFields.last30days,
    'last 3 months': InternationalEntryFields.Last3Months,
    'last 6 months': InternationalEntryFields.Last6Months,
    'last 1 year': InternationalEntryFields.Last1Year,
    'entire period': InternationalEntryFields.EntirePeriod
  };

  constructor(private translationService: TranslationService) {}

  ngOnInit(): void {
    this.selectedCountries = [...this.countryNames];
  }

  get filteredCountries() {
  return this.countryForFilter.filter(country =>
    country.hebrewName.includes(this.searchTerm) ||
    country.name.includes(this.searchTerm)
  );
}

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
    this.isTimeRangeStep = true;
    this.searchTerm = '';
  }

  loadCountryTranslations() {
  this.countryForFilter = [];

  this.countryNames.forEach(name => {
    this.translationService.getTranslation$(`InternationalEntry.${name}`).subscribe(hebrewName => {
      this.countryForFilter.push({
        name,
        hebrewName,
        selected: true
      });
    });
  });
}

  confirmTimeRange() {
    this.isTimeRangeStep = false;
    this.timeRangeChanged.emit(this.timeRangeChosen);

    if (this.isDropdownOpen && this.countryForFilter.length === 0) {
      this.loadCountryTranslations();
      console.log(this.countryForFilter);
    }
  }

  get timeRangeTranslationKey() {
    return this.timeRangeTranslationKeys[this.timeRangeChosen];
  }

  applyFilter() {
    this.selectedCountries = this.countryForFilter
      .filter(country => country.selected)
      .map(country => country.name);

    this.selectionChanged.emit(this.selectedCountries);
    this.isDropdownOpen = false;
    this.isTimeRangeStep = true;
    this.searchTerm = '';
  }

  cancelFilter() {
    this.countryForFilter.forEach(country => {
      country.selected = this.selectedCountries.includes(country.name);
    });
    this.isDropdownOpen = false;
    this.isTimeRangeStep = true;
    this.searchTerm = '';
  }
}

