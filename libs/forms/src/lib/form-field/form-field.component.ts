import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { FormFieldBase } from './form-field-base';
import { AukErrorStrategy } from './error-strategy/error-strategy';

@Component({
  selector: 'auk-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AukFormFieldComponent extends FormFieldBase {
  constructor(protected errorStrategy: AukErrorStrategy, private cd: ChangeDetectorRef) {
    super(errorStrategy);
  }
}
