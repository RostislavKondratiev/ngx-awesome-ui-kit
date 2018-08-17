import { Injectable } from '@angular/core';
import { AukErrorStrategyBase, AukServerErrorStrategyBase } from './error-strategy-base';
import { FormControl, FormGroupDirective, NgControl, NgForm } from '@angular/forms';


@Injectable()
export class AukErrorStrategy implements AukErrorStrategyBase {
  public validate(control: NgControl, form: FormGroupDirective | NgForm | null) {
    return (control && control.invalid && ((control.dirty && control.touched) || (form && form.submitted)));
  }
}

@Injectable()
export class AukServerErrorStrategy implements AukServerErrorStrategyBase {
  public validate(source: NgControl | FormGroupDirective | null) {
    return source && source.dirty;
  };
}
