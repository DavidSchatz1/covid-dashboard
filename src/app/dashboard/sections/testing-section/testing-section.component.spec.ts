import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingSectionComponent } from './testing-section.component';

describe('TestingSectionComponent', () => {
  let component: TestingSectionComponent;
  let fixture: ComponentFixture<TestingSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestingSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestingSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
