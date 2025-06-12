import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslationService } from 'src/app/core/services/translation.service';
import { hospitalTableFields } from 'src/assets/data/keys/hospitalTable.keys';

interface FilterHospital {
  name: string; 
  hebrewName: string;
  selected: boolean;
}
@Component({
  selector: 'app-hospital-filter',
  templateUrl: './hospital-filter.component.html',
  styleUrls: ['./hospital-filter.component.scss']
})
export class HospitalFilterComponent implements OnInit {
  @Input() hospitalNames: string[] = [];
  @Output() selectionChanged = new EventEmitter<string[]>();
  hospitalTableFields = hospitalTableFields

  hospitalsForFilter: FilterHospital[] = [];
  selectedHospitals: string[] = [];
  searchTerm: string = '';
  isDropdownOpen: boolean = false;

  constructor(private translationService: TranslationService) {}
 ngOnInit(): void {
  
    this.selectedHospitals = this.hospitalNames.map(h => h);
    console.log(this.hospitalNames);
  }
  prepareTranslations() {
    this.hospitalNames.forEach(hospital => {
       this.translationService.getTranslation$(`HospitalTable.${hospital}`).subscribe(hebrewName => {
        this.hospitalsForFilter.push({
          name: hospital,
          hebrewName,
          selected: true
        })
      });
    });
  }
  

  get filteredHospitals(): FilterHospital[] { 
    const lowerCaseSearchTerm = this.searchTerm.toLowerCase();
    return this.hospitalsForFilter.filter(h =>
      h.name.toLowerCase().includes(lowerCaseSearchTerm) ||
      h.hebrewName.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
    if (!this.isDropdownOpen) {
      this.searchTerm = '';
    }
    if (this.hospitalsForFilter.length === 0) {
      this.prepareTranslations();
    }
  }

  applyFilter() {
    this.selectedHospitals = this.hospitalsForFilter
      .filter(h => h.selected)
      .map(h => h.name);

    this.selectionChanged.emit(this.selectedHospitals);
    this.isDropdownOpen = false;
    this.searchTerm = '';
  }

   cancelFilter() {
    this.hospitalsForFilter.forEach(h => {
      h.selected = this.selectedHospitals.includes(h.name);
    });
    this.isDropdownOpen = false;
    this.searchTerm = '';
  }
}
