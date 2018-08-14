import { AfterViewInit, Injector } from '@angular/core';
import { AukFormFieldBase } from './../form-field/form-field-base';

export type ErrorParent<T> = T & AukFormFieldBase;

export abstract class AukErrorBase<ErrorParent> implements AfterViewInit { //tslint:disable-line
  protected container: ErrorParent;
  constructor(protected parent: ErrorParent = null, protected injector: Injector) {
  }

  public ngAfterViewInit() {
    this.container = this.injector.get(this.parent);
  }
}
