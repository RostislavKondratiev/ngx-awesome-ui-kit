import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';

export abstract class AukErrorStrategyBase {
  public abstract validate(control: FormControl,  form: FormGroupDirective | NgForm | null): boolean;
}

export abstract class AukServerErrorStrategyBase {
  public abstract validate(control: FormControl,  form: FormGroupDirective | NgForm | null): boolean;

}
