import { AfterViewInit, HostBinding, Input } from '@angular/core';
import { AukFormFieldBase } from './../form-field/form-field-base';
import { FormControl } from '@angular/forms';


export abstract class AukErrorBase<T extends AukFormFieldBase> implements AfterViewInit {
  @Input()
  @HostBinding('hidden')
  public hidden = true;

  protected container: T;
  protected control: FormControl;

  protected abstract registerParent(): T;

  protected abstract statusChangesHandler(invalid: boolean): void;

  public ngAfterViewInit() {
    this.container = this.registerParent();
    this.control = this.container.control;
    if (!this.container) {
      throw new Error('Error parent should be registered');
    }
    this.container.statusChanges$
      .subscribe(this.statusChangesHandler.bind(this));
  }
}
