import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-line',
  templateUrl: './loading-line.component.html',
  styleUrls: ['./loading-line.component.scss']
})
export class LoadingLineComponent implements OnInit {
  isActive = false;

  ngOnInit() {
    // Start animation
    setTimeout(() => {
      this.isActive = true;
    }, 1000); // Start immediately or with a delay
  }
}
