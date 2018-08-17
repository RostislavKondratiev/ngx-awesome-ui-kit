import {
  AfterViewInit,
  ChangeDetectorRef,
  Directive,
  Injector,
  Input,
  OnDestroy, Optional,
  ViewContainerRef
} from '@angular/core';
import { FormControl, FormGroupDirective } from '@angular/forms';
import { AukFormFieldComponent } from './../form-field/form-field.component';
import { AukServerErrorStrategy } from './../form-field/error-strategy';
import { AukErrorBase } from './error-base';
import { skip } from 'rxjs/operators';

@Directive({
  selector: 'auk-server-error' //tslint:disable-line
})
export class AukServerErrorDirective extends AukErrorBase implements OnDestroy {
  @Input() public key: string[];

  @Input()
  public set error(errors) {
    this.errorMessage = this.getNestedValue(errors, this.key);
    if (errors && this.errorMessage) {
      console.log(this.errorMessage);
      this.viewContainer.element.nativeElement.innerHTML = this.errorMessage;
      if (this.control instanceof FormControl) {
        this.control.setErrors({ serverError: this.errorMessage });
      }
      this.hidden = false;
    }
  };

  protected errorMessage: string;

  constructor(@Optional() public form: FormGroupDirective,
              protected injector: Injector,
              protected strategy: AukServerErrorStrategy,
              protected viewContainer: ViewContainerRef,
              protected cd: ChangeDetectorRef) {
    super();
  }

  protected connect() {
    const container = this.injector.get(AukFormFieldComponent, null);
    this.control = container ? container.control : this.form;
    return this.control.statusChanges;
  }

  protected statusChangesHandler() {
    this.hidden = this.strategy.validate(this.control);
    this.cd.markForCheck();
  }

  protected getNestedValue(object: any, path: string[]) {
    return path.reduce(function(prev, curr) {
      return prev ? prev[curr] : null;
    }, object);
  }
}
