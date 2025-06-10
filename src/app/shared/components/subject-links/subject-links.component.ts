import { Component, OnInit } from '@angular/core';
import {subjectLinksFields} from 'src/assets/data/keys/subjectLinks.keys';

@Component({
  selector: 'app-subject-links',
  templateUrl: './subject-links.component.html',
  styleUrls: ['./subject-links.component.scss']
})
export class SubjectLinksComponent implements OnInit {
  subjectLinksFields = subjectLinksFields;
  isOpen: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }
}
