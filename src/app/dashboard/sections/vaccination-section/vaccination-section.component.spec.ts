import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccinationSectionComponent } from './vaccination-section.component';

describe('VaccinationSectionComponent', () => {
  let component: VaccinationSectionComponent;
  let fixture: ComponentFixture<VaccinationSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VaccinationSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VaccinationSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
