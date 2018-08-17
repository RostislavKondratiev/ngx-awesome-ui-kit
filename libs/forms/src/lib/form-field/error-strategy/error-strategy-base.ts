import { FormGroupDirective, NgControl, NgForm } from '@angular/forms';

export abstract class AukErrorStrategyBase {
  public abstract validate(control: NgControl, form: FormGroupDirective | NgForm | null): boolean;
}

export abstract class AukServerErrorStrategyBase {
  public abstract validate(control: NgControl, form: FormGroupDirective | NgForm | null): boolean;

}
