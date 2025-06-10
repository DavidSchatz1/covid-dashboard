import { Component, OnInit } from '@angular/core';
import { TestingField } from 'src/assets/data/keys/Testing.keys';
@Component({
  selector: 'app-testing-section',
  templateUrl: './testing-section.component.html',
  styleUrls: ['./testing-section.component.scss']
})
export class TestingSectionComponent implements OnInit {
  TestingField = TestingField
  constructor() { }

  ngOnInit(): void {
  }

}
