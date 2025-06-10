import { Component, OnInit } from '@angular/core';
import { SideMenuFields } from 'src/assets/data/keys/sideMenu.keys';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
 isExpanded: boolean = false;
  isDataMenuOpen: boolean = false;
  SideMenuFields = SideMenuFields;
  constructor() { }

  ngOnInit(): void {
  }

    toggleExpand() {
    this.isExpanded = !this.isExpanded;
    if (!this.isExpanded) {
      this.isDataMenuOpen = false;
    }
  }

  toggleDataMenu() {
    this.isDataMenuOpen = !this.isDataMenuOpen;
  }
}
