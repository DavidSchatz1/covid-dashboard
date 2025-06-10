import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccinationEffectivenessSectionComponent } from './vaccination-effectiveness-section.component';

describe('VaccinationEffectivenessSectionComponent', () => {
  let component: VaccinationEffectivenessSectionComponent;
  let fixture: ComponentFixture<VaccinationEffectivenessSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VaccinationEffectivenessSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VaccinationEffectivenessSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
