import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildCasesSectionComponent } from './child-cases-section.component';

describe('ChildCasesSectionComponent', () => {
  let component: ChildCasesSectionComponent;
  let fixture: ComponentFixture<ChildCasesSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChildCasesSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChildCasesSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
