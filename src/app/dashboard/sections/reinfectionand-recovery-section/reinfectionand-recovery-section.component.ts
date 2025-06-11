import { Component} from '@angular/core';
import { ReinfectionandRecoveryFields } from 'src/assets/data/keys/ReinfectionandRecovery.keys';
@Component({
  selector: 'app-reinfectionand-recovery-section',
  templateUrl: './reinfectionand-recovery-section.component.html',
  styleUrls: ['./reinfectionand-recovery-section.component.scss']
})
export class ReinfectionandRecoverySectionComponent {
  ReinfectionandRecoveryFields = ReinfectionandRecoveryFields
}
