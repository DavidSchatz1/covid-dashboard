import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalDataSectionComponent } from './additional-data-section.component';

describe('AdditionalDataSectionComponent', () => {
  let component: AdditionalDataSectionComponent;
  let fixture: ComponentFixture<AdditionalDataSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdditionalDataSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdditionalDataSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
