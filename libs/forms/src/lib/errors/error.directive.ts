import { AfterViewInit, ChangeDetectorRef, Directive, HostBinding, Injector, Input } from '@angular/core';
import { AukFormFieldComponent } from '../form-field/form-field.component';
import { AukErrorBase } from './error-base';

@Directive({
  selector: 'auk-error' // tslint:disable-line
})
export class AukErrorDirective extends AukErrorBase<AukFormFieldComponent> implements AfterViewInit {
  @Input() public key: string;

  constructor(protected injector: Injector, protected cd: ChangeDetectorRef) {
    super();
  }

  protected statusChangesHandler(invalid: boolean) {
    this.hidden = !(invalid && this.control.hasError(this.key));
    this.cd.markForCheck();
  }

  protected registerParent(): AukFormFieldComponent {
    return this.injector.get(AukFormFieldComponent);
  }

  public ngAfterViewInit() {
    super.ngAfterViewInit();
  }
}
