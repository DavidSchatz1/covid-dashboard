import { Component, OnInit } from '@angular/core';
import { vaccinationEffectivenessFields } from 'src/assets/data/keys/VaccinationEffectiveness.keys';
@Component({
  selector: 'app-vaccination-effectiveness-section',
  templateUrl: './vaccination-effectiveness-section.component.html',
  styleUrls: ['./vaccination-effectiveness-section.component.scss']
})
export class VaccinationEffectivenessSectionComponent implements OnInit {
  vaccinationEffectivenessFields = vaccinationEffectivenessFields
  constructor() { }

  ngOnInit(): void {
  }

}
