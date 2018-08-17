import { AukInputDirective } from './input.directive';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync } from '@angular/core/testing';
import { FormControl, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { createComponent } from '../tests/helpers';

//tslint:disable

describe('AukInputDirective', () => {
  describe('AukInputDirective common cases', () => {
    let fixture: ComponentFixture<AukInputCommon>;
    let input: DebugElement;
    beforeEach(() => {
      fixture = createComponent(AukInputCommon);
      input = fixture.debugElement.query(By.directive(AukInputDirective));
      fixture.detectChanges();
    });

    it('input should have default id', fakeAsync(() => {
      expect(input.attributes.id).toBe('auk-input-0');
    }));

    it('input directive should be created', fakeAsync(() => {
      expect(input.injector.get(AukInputDirective)).toBeDefined();
    }));

    it('input should be not disabled', fakeAsync(() => {
      expect(input.nativeElement.disabled).toBeFalsy();
    }));

    it('input should must not have a placeholder', fakeAsync(() => {
      expect(input.nativeElement.hasAttribute('placeholder')).toBeFalsy();
    }));

    it('input should not contain has-error class', fakeAsync(() => {
      expect(input.nativeElement.classList.contains('auk-has-error')).toBeFalsy();
    }));

    it('input should have empty value', fakeAsync(() => {
      expect(input.nativeElement.value).toBe('');
    }));

    it('input should must not be readonly', fakeAsync(() => {
      expect(input.nativeElement.hasAttribute('readonly')).toBeFalsy();
    }));

    it('input should not be required', fakeAsync(() => {
      expect(input.injector.get(AukInputDirective).required).toBeFalsy();
    }));

    it('input should be focused', fakeAsync(() => {
      input.nativeElement.dispatchEvent(new Event('focus'));
      fixture.detectChanges();
      expect(input.injector.get(AukInputDirective).focused).toBeTruthy();
      expect(input.nativeElement.classList.contains('auk-focused')).toBeTruthy();
    }));

    it('input should be focused by calling focus programmly', fakeAsync(() => {
      const directive = input.injector.get(AukInputDirective);
      directive.focus();
      fixture.detectChanges();
      expect(directive.focused).toBeTruthy();
    }));

    it('input should be unfocused', fakeAsync(() => {
      input.nativeElement.dispatchEvent(new Event('blur'));
      fixture.detectChanges();
      expect(input.injector.get(AukInputDirective).focused).toBeFalsy();
    }));

  });

  it('default input should be changed', fakeAsync(() => {
    const fixture: ComponentFixture<AukInputWithID> = createComponent(AukInputWithID);
    const input = fixture.debugElement.query(By.directive(AukInputDirective));
    fixture.componentInstance.id = 'test-id';
    fixture.detectChanges();
    expect(input.attributes.id).toBe('test-id');
  }));

  it('input should disabled by pass disabled property', fakeAsync(() => {
    const fixture: ComponentFixture<AukInputDisabled> = createComponent(AukInputDisabled);
    const input = fixture.debugElement.query(By.directive(AukInputDirective));
    fixture.componentInstance.disabled = true;
    fixture.detectChanges();
    expect(input.nativeElement.disabled).toBeTruthy();
  }));

  it('input should be readonly by pass readonly property', fakeAsync(() => {
    const fixture: ComponentFixture<AukInputReadonly> = createComponent(AukInputReadonly);
    fixture.detectChanges();
    const input = fixture.debugElement.query(By.directive(AukInputDirective)).injector.get(AukInputDirective);
    fixture.componentInstance.readonly = true;
    fixture.detectChanges();
    input.focusChanged(true);
    fixture.detectChanges();
    expect(input.focused).toBeFalsy();
  }));

  it('input should disabled apply value from value property', fakeAsync(() => {
    const fixture: ComponentFixture<AukInputWithValue> = createComponent(AukInputWithValue);
    const input = fixture.debugElement.query(By.directive(AukInputDirective));
    fixture.componentInstance.value = 'test';
    fixture.detectChanges();
    expect(input.nativeElement.value).toBe('test');
    expect(input.injector.get(AukInputDirective).value).toBe('test');
  }));

  it('input should be required', fakeAsync(() => {
    const fixture: ComponentFixture<AukInputWithRequired> = createComponent(AukInputWithRequired);
    const input = fixture.debugElement.query(By.directive(AukInputDirective));
    fixture.componentInstance.required = true;
    fixture.detectChanges();
    expect(input.injector.get(AukInputDirective).required).toBeTruthy();
  }));

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
      expect(input.nativeElement.classList.contains('auk-has-error')).toBeTruthy();
    }));

  });
});

@Component({
  template: `
    <input type="text"
           aukInput
    >
  `
})
export class AukInputCommon { //tslint:disable-line
}

@Component({
  template: `
    <auk-form-field><input type="text" aukInput [id]="id"></auk-form-field>
  `
})
export class AukInputWithID { //tslint:disable-line
  public id;
}

@Component({
  template: `
    <auk-form-field><input type="text" aukInput [disabled]="disabled"></auk-form-field>
  `
})
export class AukInputDisabled { //tslint:disable-line
  public disabled;
}

@Component({
  template: `
    <auk-form-field><input type="text" aukInput [placeholder]="placeholder"></auk-form-field>
  `
})
export class AukInputWithPlaceholder { //tslint:disable-line
  public placeholder;
}

@Component({
  template: `
    <auk-form-field><input type="text" aukInput [readonly]="readonly"></auk-form-field>
  `
})
export class AukInputReadonly { //tslint:disable-line
  public readonly;
}

@Component({
  template: `
    <auk-form-field><input type="text" aukInput [value]="value"></auk-form-field>
  `
})
export class AukInputWithValue { //tslint:disable-line
  public value;
}

@Component({
  template: `
    <auk-form-field><input type="text" aukInput [required]="required"></auk-form-field>
  `
})
export class AukInputWithRequired { //tslint:disable-line
  public required;
}


// @ts-ignore
@Component({
  template: `
    <auk-form-field><input type="text" aukInput [formControl]="control"></auk-form-field>
  `
})
export class AukInputWithControl { //tslint:disable-line
  public control = new FormControl(null, [Validators.required]);
}
