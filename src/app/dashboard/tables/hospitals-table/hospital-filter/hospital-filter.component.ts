import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { hospitalTableFields } from 'src/assets/data/keys/hospitalTable.keys';

@Component({
  selector: 'app-hospital-filter',
  templateUrl: './hospital-filter.component.html',
  styleUrls: ['./hospital-filter.component.scss']
})
export class HospitalFilterComponent implements OnInit {
  @Input() hospitalNames: string[] = [];
  @Output() selectionChanged = new EventEmitter<string[]>();
  hospitalTableFields = hospitalTableFields

  hospitalsForFilter: { name: string; selected: boolean }[] = [];
  selectedHospitals: string[] = [];
  searchTerm: string = '';
  isDropdownOpen: boolean = false;

  ngOnInit(): void {
    this.hospitalsForFilter = this.hospitalNames.map(name => ({
      name,
      selected: true
    }));
    this.selectedHospitals = [...this.hospitalNames];
  }

  get filteredHospitals() {
    return this.hospitalsForFilter.filter(h =>
      h.name.includes(this.searchTerm)
    );
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
    if (!this.isDropdownOpen) {
      this.searchTerm = '';
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
