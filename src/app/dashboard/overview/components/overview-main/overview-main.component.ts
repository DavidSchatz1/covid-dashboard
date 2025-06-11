import { Component} from '@angular/core';
import { OverviewFields } from 'src/assets/data/keys/overview-data.keys';

@Component({
  selector: 'app-overview-main',
  templateUrl: './overview-main.component.html',
  styleUrls: ['./overview-main.component.scss']
})
export class OverviewMainComponent {

  OverviewFields = OverviewFields;

}
