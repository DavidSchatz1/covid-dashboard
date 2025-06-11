import { Component } from '@angular/core';
import { childCasesFields } from 'src/assets/data/keys/childCases.keys';
@Component({
  selector: 'app-child-cases-section',
  templateUrl: './child-cases-section.component.html',
  styleUrls: ['./child-cases-section.component.scss']
})
export class ChildCasesSectionComponent {
  childCasesFields = childCasesFields;
}
