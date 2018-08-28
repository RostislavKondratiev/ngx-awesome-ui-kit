import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AukTableFiltersComponent } from './table-filters.component';

describe('AukTableFiltersComponent', () => {
  let component: AukTableFiltersComponent;
  let fixture: ComponentFixture<AukTableFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AukTableFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AukTableFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
