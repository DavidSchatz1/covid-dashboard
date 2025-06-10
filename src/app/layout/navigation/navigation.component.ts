import { Component, OnInit } from '@angular/core';
import { navigatioFields } from 'src/assets/data/keys/navigation-data.keys';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  navigationFields = navigatioFields
  constructor() { }

  ngOnInit(): void {
  }

}
