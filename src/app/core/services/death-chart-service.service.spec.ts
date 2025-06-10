import { TestBed } from '@angular/core/testing';

import { DeathChartServiceService } from './death-chart-service.service';

describe('DeathChartServiceService', () => {
  let service: DeathChartServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeathChartServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
