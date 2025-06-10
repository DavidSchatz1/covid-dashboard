import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternationalEntryComponent } from './international-entry.component';

describe('InternationalEntryComponent', () => {
  let component: InternationalEntryComponent;
  let fixture: ComponentFixture<InternationalEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternationalEntryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InternationalEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
