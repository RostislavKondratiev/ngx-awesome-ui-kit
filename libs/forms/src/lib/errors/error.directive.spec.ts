// import { AukErrorDirective } from './error.directive';
// import { fakeAsync, flush } from '@angular/core/testing';
// import { Component } from '@angular/core';
// import { FormControl, Validators } from '@angular/forms';
// import { createComponent } from '../tests/helpers';
// import { By } from '@angular/platform-browser';
// import { AukInputDirective } from '../input/input.directive';
//
// describe('ErrorDirective', () => {
//   it('error should appear when field invalid', fakeAsync(() => {
//     const fixture = createComponent(AukInputWithControl);
//     const input = fixture.debugElement.query(By.directive(AukInputDirective));
//     fixture.detectChanges();
//     input.nativeElement.dispatchEvent(new Event('focus'));
//     input.nativeElement.value = 'test';
//     flush();
//     fixture.detectChanges();
//     input.nativeElement.value = '';
//     input.nativeElement.dispatchEvent(new Event('blur'));
//     flush();
//     fixture.detectChanges();
//     const error = fixture.debugElement.query(By.directive(AukErrorDirective));
//     expect(error.properties.hidden).toBeFalsy();
//   }))
// });
//
// @Component({
//   template: `
//     <auk-form-field><input type="text" aukInput [formControl]="control"></auk-form-field>
//   `
// })
// export class AukInputWithControl { //tslint:disable-line
//   public control = new FormControl(null, [Validators.required]);
// }
//
