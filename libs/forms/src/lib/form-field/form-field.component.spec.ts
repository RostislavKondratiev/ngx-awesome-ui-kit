import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AukFormFieldComponent } from './form-field.component';

describe('AukFormFieldComponent', () => {
  let component: AukFormFieldComponent;
  let fixture: ComponentFixture<AukFormFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AukFormFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AukFormFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
