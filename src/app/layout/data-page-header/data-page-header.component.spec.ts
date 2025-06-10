import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataPageHeaderComponent } from './data-page-header.component';

describe('DataPageHeaderComponent', () => {
  let component: DataPageHeaderComponent;
  let fixture: ComponentFixture<DataPageHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataPageHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataPageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
