import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeathsSectionComponent } from './deaths-section.component';

describe('DeathsSectionComponent', () => {
  let component: DeathsSectionComponent;
  let fixture: ComponentFixture<DeathsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeathsSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeathsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
