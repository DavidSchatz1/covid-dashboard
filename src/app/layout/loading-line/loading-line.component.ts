import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-line',
  templateUrl: './loading-line.component.html',
  styleUrls: ['./loading-line.component.scss']
})
export class LoadingLineComponent implements OnInit {
  isActive = false;

  ngOnInit() {
    setTimeout(() => {
      this.isActive = true;
    }, 1000);
  }
}
