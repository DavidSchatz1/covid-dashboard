import { TestBed } from '@angular/core/testing';

import { ThemeObserverService } from './theme-observer.service';

describe('ThemeObserverService', () => {
  let service: ThemeObserverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeObserverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
