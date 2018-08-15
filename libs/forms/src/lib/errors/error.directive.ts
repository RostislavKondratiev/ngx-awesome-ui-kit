import { ChangeDetectorRef, Directive, Injector, Input } from '@angular/core';
import { AukErrorBase } from './error-base';
import { AukFormFieldComponent } from './../form-field/form-field.component';
import { Observable } from 'rxjs';

@Directive({
  selector: 'auk-error' // tslint:disable-line
})
export class AukErrorDirective extends AukErrorBase {
  @Input() public key: string;

  constructor(
    protected injector: Injector,
    protected cd: ChangeDetectorRef
  ) {
    super();
  }

  protected statusChangesHandler(invalid: boolean) {
    this.hidden = !(invalid && this.control.hasError(this.key));
    this.cd.markForCheck();
  }

  protected connect(): Observable<any> | null {
    const container = this.injector.get(AukFormFieldComponent, null);
    if (!container) {
      return null;
    }
    this.control = container.control;
    return container.statusChanges$;
  }
}
