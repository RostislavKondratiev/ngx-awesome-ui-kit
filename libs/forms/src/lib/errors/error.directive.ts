import { AfterViewInit, ChangeDetectorRef, Directive, HostBinding, Injector, Input } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { AukFormFieldComponent } from '../form-field/form-field.component';

@Directive({
  selector: 'auk-error' // tslint:disable-line
})
export class AukErrorDirective implements AfterViewInit {
  @Input() public key: string;

  @Input()
  @HostBinding('hidden') public hidden = true;

  public container: AukFormFieldComponent;

  protected control: FormControl;
  // protected form: FormGroupDirective | NgForm;

  constructor(
    protected injector: Injector,
    protected cd: ChangeDetectorRef
  ) {
  }

  public ngAfterViewInit() {
    this.container = this.injector.get(AukFormFieldComponent, null);
    if (!this.container) {
      return;
    }
    this.control = this.container.control;
    // this.form = this.container.input.parent;
    this.container.statusChanges$
      .subscribe((invalid) => {
        this.hidden = !(invalid && this.control.hasError(this.key));
        this.cd.markForCheck();
      });
  }
}
