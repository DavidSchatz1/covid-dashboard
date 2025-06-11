import { Component } from '@angular/core';
import { TestingFields } from 'src/assets/data/keys/Testing.keys';
@Component({
  selector: 'app-testing-section',
  templateUrl: './testing-section.component.html',
  styleUrls: ['./testing-section.component.scss']
})
export class TestingSectionComponent {
  TestingField = TestingFields
}
