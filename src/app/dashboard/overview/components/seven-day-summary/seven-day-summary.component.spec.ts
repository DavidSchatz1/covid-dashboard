import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SevenDaySummaryComponent } from './seven-day-summary.component';

describe('SevenDaySummaryComponent', () => {
  let component: SevenDaySummaryComponent;
  let fixture: ComponentFixture<SevenDaySummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SevenDaySummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SevenDaySummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
