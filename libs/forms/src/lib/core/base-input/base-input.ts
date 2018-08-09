import { FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import {
  DoCheck,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Self
} from '@angular/core';
import { FormFieldControl } from '@auk/forms';
import { Subject } from 'rxjs';

export abstract class AukBaseInput implements FormFieldControl, DoCheck, OnDestroy {
  public readonly stateChange$: Subject<void> = new Subject<void>();
  public focused = false;

  protected _id: string;
  protected abstract _uid;

  protected _value: any;
  protected _disabled: boolean;
  protected _required: boolean;
  protected _readonly: boolean;

  public abstract get value();

  public abstract set value(value);

  public abstract get disabled();
  public abstract set disabled(value);

  @HostBinding('attr.id')
  @Input()
  public get id(): string {
    return this._id || this._uid;
  }

  public set id(value: string) {
    this._id = value || this._uid;
  }

  public get required(): boolean {
    return this._required;
  }

  public set required(value: boolean) {
    this._required = !!value;
  }

  public get readonly(): boolean {
    return this._readonly;
  }

  public set readonly(value: boolean) {
    this._readonly = !!value;
  }

  public get element() {
    return this.elem.nativeElement;
  }

  public get control() {
    return this.ngControl;
  }

  public get parent() {
    return this._parentFormGroup || this._parentForm;
  }

  @HostBinding('class.has-error')
  public hasError = false;

  @HostListener('blur', ['false'])
  @HostListener('focus', ['true'])
  public focusChanged(isFocused: boolean) {
    if (isFocused !== this.focused && !this._readonly) {
      this.focused = isFocused;
      this.stateChange$.next();
    }
  }

  constructor(protected elem: ElementRef,
              @Optional() @Self() protected ngControl: NgControl,
              @Optional() protected _parentForm: NgForm,
              @Optional() protected _parentFormGroup: FormGroupDirective) {
  }

  public ngDoCheck() {
    this.stateChange$.next();
  }

  public focus(): void {
    this.element.nativeElement.focus();
  }

  public ngOnDestroy() {
    this.stateChange$.complete();
  }
}
