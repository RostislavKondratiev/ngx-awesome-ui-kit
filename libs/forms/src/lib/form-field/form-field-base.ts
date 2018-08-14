import { AfterContentInit, ContentChild, OnDestroy } from '@angular/core';
import { merge, Observable, Subject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { map, share, takeUntil } from 'rxjs/operators';
import { FormFieldControl } from './../core/form-field-control';
import { AukErrorStrategy } from './error-strategy';

export abstract class AukFormFieldBase implements AfterContentInit, OnDestroy {
  @ContentChild(FormFieldControl) public input: FormFieldControl;
  public statusChanges$: Observable<string | boolean>;
  public control: FormControl;

  protected until$: Subject<void> = new Subject<void>();
  protected errorStrategy: AukErrorStrategy;

  protected constructor(errorStrategy: AukErrorStrategy) {
    this.errorStrategy = errorStrategy;
  }

  public ngAfterContentInit() {
    if (!this.input.control) {
      return;
    }
    this.control = this.input.control.control as FormControl;
    this.statusChanges$ = merge(this.control.statusChanges, this.input.stateChange$)
      .pipe(
        takeUntil(this.until$),
        map(() => this.input.hasError = this.errorStrategy.validate(this.control, this.input.parent)),
        share()
      );
  }

  public ngOnDestroy() {
    this.until$.next();
    this.until$.complete();
  }
}
