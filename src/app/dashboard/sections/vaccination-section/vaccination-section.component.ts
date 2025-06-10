import { Component, OnInit } from '@angular/core';
import { VaccinationFields } from 'src/assets/data/keys/Vaccination.keys';
@Component({
  selector: 'app-vaccination-section',
  templateUrl: './vaccination-section.component.html',
  styleUrls: ['./vaccination-section.component.scss']
})
export class VaccinationSectionComponent implements OnInit {
  VaccinationFields = VaccinationFields;
  constructor() { }

  ngOnInit(): void {
  }

}
