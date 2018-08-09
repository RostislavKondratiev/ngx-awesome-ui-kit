import { AukInputDirective } from './input.directive';
import { AukFormFieldComponent, AukFormFieldModule} from './../form-field';
import { AukInputModule } from './input.module';
import { Component, Provider, Type } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('AukInputDirective without forms', () => {
  describe('AukInputDirective with formControl', () => {
    let fixture;
    let input;
    let control;
    beforeEach(() => {
      fixture = createComponent(AukInputWithControl);
      input = fixture.debugElement.query(By.directive(AukInputDirective));
      control = fixture.componentInstance.control;
      fixture.detectChanges();
    });

    it('input should have default id', fakeAsync(() => {
      expect(input.attributes.id).toBe('auk-input-0');
    }));

    it('default input should be changed', fakeAsync(() => {
      fixture.componentInstance.id = 'test-id';
      fixture.detectChanges();
      expect(input.attributes.id).toBe('test-id');
    }));

    it('change value of input should change formControl value', fakeAsync(() => {
      input.nativeElement.value = 'test';
      input.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(control.value).toBe('test');
    }));

    it('change control value should change input value', fakeAsync(() => {
      control.setValue('test');
      fixture.detectChanges();
      expect(input.nativeElement.value).toBe('test');
    }));

    it('input should has hasError class, when invalid', fakeAsync(() => {
      input.nativeElement.value = 'test';
      input.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      input.nativeElement.value = '';
      input.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      input.nativeElement.dispatchEvent(new Event('blur'));
      fixture.detectChanges();
      expect(input.nativeElement.classList.contains('has-error')).toBe(true);
    }));

  })
});

function createComponent<T>(component: Type<T>,
                            providers: Provider[] = [],
                            imports: any[] = []): ComponentFixture<T> {
  TestBed.configureTestingModule({
    imports: [
      FormsModule,
      AukFormFieldModule,
      AukInputModule,
      BrowserAnimationsModule,
      ReactiveFormsModule,
      ...imports
    ],
    declarations: [component],
    providers,
  }).compileComponents();

  return TestBed.createComponent<T>(component);
}

// @ts-ignore
@Component({
  template: `
    <auk-form-field><input type="text" aukInput [id]="id" [formControl]="control"></auk-form-field>
  `
})
export class AukInputWithControl { //tslint:disable-line
  public control = new FormControl(null, [Validators.required]);
  public id = null;
}
