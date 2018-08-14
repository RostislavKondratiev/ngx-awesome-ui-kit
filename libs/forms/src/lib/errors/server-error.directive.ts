import {
  AfterViewInit,
  ChangeDetectorRef,
  Directive,
  HostBinding,
  Injector,
  Input,
  OnDestroy,
  Optional,
  ViewContainerRef
} from '@angular/core';
import { FormControl, FormGroupDirective } from '@angular/forms';
import { Subject } from 'rxjs';
import { AukFormFieldComponent } from './../form-field/form-field.component';
import { AukServerErrorStrategy } from './../form-field/error-strategy';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: 'auk-server-error' //tslint:disable-line
})
export class AukServerErrorDirective implements OnDestroy, AfterViewInit{
  @Input() public key: string[];
  @HostBinding('hidden') public hidden = true;

  @Input()
  public set error(errors) {
    this.errorMessage = this.getNestedValue(errors, this.key);
    if (errors && this.errorMessage) {
      this.viewContainer.element.nativeElement.innerHTML = this.errorMessage;
      if (this.control instanceof FormControl) {
        this.control.setErrors({serverError: this.errorMessage});
      }
      this.hidden = false;
    }
  };

  protected control: FormControl | FormGroupDirective;
  protected errorMessage: string;
  protected until$: Subject<void> = new Subject<void>();

  constructor(@Optional() protected container: AukFormFieldComponent,
              @Optional() public form: FormGroupDirective,
              protected strategy: AukServerErrorStrategy,
              protected viewContainer: ViewContainerRef,
              protected cd: ChangeDetectorRef) {
  }

  public ngAfterViewInit() {
    this.control = this.container ? this.container.control : this.form;
    this.control.statusChanges
      .pipe(
        takeUntil(this.until$),
      )
      .subscribe(() => {
        this.hidden = this.strategy.validate(this.control);
        this.cd.markForCheck();
      });
  }

  public ngOnDestroy() {
    this.until$.next();
    this.until$.complete();
  }


  protected getNestedValue(object: any, path: string[]) {
    return path.reduce(function(prev, curr) {
      return prev ? prev[curr] : null
    }, object)
  }
}
