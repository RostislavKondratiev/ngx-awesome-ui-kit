import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AukSortHeaderComponent } from './sort-header.component';

describe('AukSortHeaderComponent', () => {
  let component: AukSortHeaderComponent;
  let fixture: ComponentFixture<AukSortHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AukSortHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AukSortHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
