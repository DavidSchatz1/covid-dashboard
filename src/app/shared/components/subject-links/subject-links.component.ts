import { Component } from '@angular/core';
import {subjectLinksFields} from 'src/assets/data/keys/subjectLinks.keys';

@Component({
  selector: 'app-subject-links',
  templateUrl: './subject-links.component.html',
  styleUrls: ['./subject-links.component.scss']
})
export class SubjectLinksComponent {
  subjectLinksFields = subjectLinksFields;
  isOpen: boolean = false;

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }
}
