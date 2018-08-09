import { ChangeDetectorRef, Component } from '@angular/core';
import { FormFieldBase } from './form-field-base';
import { AukErrorStrategy } from './error-strategy/error-strategy';

@Component({
  selector: 'auk-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss']
})
export class AukFormFieldComponent extends FormFieldBase {
  constructor(protected errorStrategy: AukErrorStrategy, private cd: ChangeDetectorRef) {
    super(errorStrategy);
  }
}
