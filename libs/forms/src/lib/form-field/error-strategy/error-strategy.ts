import { Injectable } from '@angular/core';
import { AukErrorStrategyBase, AukServerErrorStrategyBase } from './error-strategy-base';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';


@Injectable()
export class AukErrorStrategy implements AukErrorStrategyBase {
  public validate(control: FormControl, form: FormGroupDirective | NgForm | null) {
    return (control && control.invalid && ((control.dirty && control.touched) || (form && form.submitted)));
  }
}

@Injectable()
export class AukServerErrorStrategy implements AukServerErrorStrategyBase {
  public validate(source: FormControl | FormGroupDirective | null) {
    return true;
  };
}
