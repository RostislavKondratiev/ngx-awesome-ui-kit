import { Directive, ElementRef, Optional, Self } from '@angular/core';
import { AukBaseInput } from '../core/base-input/base-input';
import { FormFieldControl } from '../core/form-field-control';

let nextUniqueId = 0;

@Directive({
  selector: '[aukInput]',
  providers: [{provide: FormFieldControl, useExisting: AukInputDirective}]
})
export class AukInputDirective extends AukBaseInput {
  protected _uid = `auk-input-${nextUniqueId++}`;

  public get value() {
    return this.element.nativeElement.value;
  }

  public set value(value: string) {
    if (value !== this.value) {
      this.element.nativeElement.value = value;
      this.stateChange$.next();
    }
  }

  get disabled() {
    if (this.control && this.control.disabled !== null) {
      return this.ngControl.disabled;
    }
    return this._disabled;
  }

  set disabled(value: any) {
    this._disabled = !!value;
    if (this.focused) {
      this.focused = false;
      this.stateChange$.next();
    }
  }
}
