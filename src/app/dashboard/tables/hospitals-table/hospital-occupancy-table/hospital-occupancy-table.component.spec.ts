import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalOccupancyTableComponent } from './hospital-occupancy-table.component';

describe('HospitalOccupancyTableComponent', () => {
  let component: HospitalOccupancyTableComponent;
  let fixture: ComponentFixture<HospitalOccupancyTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HospitalOccupancyTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HospitalOccupancyTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
