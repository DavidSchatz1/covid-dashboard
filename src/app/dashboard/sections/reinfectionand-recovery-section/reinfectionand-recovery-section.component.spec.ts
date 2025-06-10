import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReinfectionandRecoverySectionComponent } from './reinfectionand-recovery-section.component';

describe('ReinfectionandRecoverySectionComponent', () => {
  let component: ReinfectionandRecoverySectionComponent;
  let fixture: ComponentFixture<ReinfectionandRecoverySectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReinfectionandRecoverySectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReinfectionandRecoverySectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
