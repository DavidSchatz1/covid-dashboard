import { Component} from '@angular/core';
import { AdditionalDataFields } from 'src/assets/data/keys/AdditionalData.keys';
import { hospitalTableFields } from 'src/assets/data/keys/hospitalTable.keys';
@Component({
  selector: 'app-additional-data-section',
  templateUrl: './additional-data-section.component.html',
  styleUrls: ['./additional-data-section.component.scss']
})
export class AdditionalDataSectionComponent {
  AdditionalDataFields = AdditionalDataFields
  hospitalTableFields = hospitalTableFields
}
