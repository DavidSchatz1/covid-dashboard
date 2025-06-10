import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitiesColorsComponent } from './cities-colors.component';

describe('CitiesColorsComponent', () => {
  let component: CitiesColorsComponent;
  let fixture: ComponentFixture<CitiesColorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CitiesColorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitiesColorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
