import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectLinksComponent } from './subject-links.component';

describe('SubjectLinksComponent', () => {
  let component: SubjectLinksComponent;
  let fixture: ComponentFixture<SubjectLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectLinksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubjectLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
