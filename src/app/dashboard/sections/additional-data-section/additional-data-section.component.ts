import { Component, OnInit } from '@angular/core';
import { AdditionalDataField } from 'src/assets/data/keys/AdditionalData.keys';
import { hospitalTableFields } from 'src/assets/data/keys/hospitalTable.keys';
@Component({
  selector: 'app-additional-data-section',
  templateUrl: './additional-data-section.component.html',
  styleUrls: ['./additional-data-section.component.scss']
})
export class AdditionalDataSectionComponent implements OnInit {
  AdditionalDataField = AdditionalDataField
  hospitalTableFields = hospitalTableFields

  tempString: string = "nothing important"
  constructor() { }
 
  ngOnInit(): void {
  }

}
