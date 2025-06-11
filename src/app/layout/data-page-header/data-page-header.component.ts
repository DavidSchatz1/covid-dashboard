import { Component, OnInit } from '@angular/core';
import { dataPageHeaderFields } from 'src/assets/data/keys/data-page-header.keys';
@Component({
  selector: 'app-data-page-header',
  templateUrl: './data-page-header.component.html',
  styleUrls: ['./data-page-header.component.scss']
})
export class DataPageHeaderComponent implements OnInit {
  dataPageHeaderFields = dataPageHeaderFields;
  
  constructor() { }

  ngOnInit(): void {
    
  }

}
