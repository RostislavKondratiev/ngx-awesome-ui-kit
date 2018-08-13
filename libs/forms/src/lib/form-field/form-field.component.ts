import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, ContentChildren, QueryList,
  ViewEncapsulation
} from '@angular/core';
import { FormFieldBase } from './form-field-base';
import { AukErrorStrategy } from './error-strategy/error-strategy';
import { AukErrorDirective } from './../errors/error.directive';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'auk-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AukFormFieldComponent extends FormFieldBase implements AfterContentInit {
  @ContentChildren(AukErrorDirective) public errors: QueryList<AukErrorDirective>;
  public availableCustom: string[] = [];
  constructor(protected errorStrategy: AukErrorStrategy, private cd: ChangeDetectorRef) {
    super(errorStrategy);
  }

  public ngAfterContentInit() {
    super.ngAfterContentInit();
    this.availableCustom = this.errors.map((v) => v.key);
    this.errors.changes.pipe(takeUntil(this.until$)).subscribe((list: QueryList<AukErrorDirective>) => {
      this.availableCustom = list.map((v) => v.key);
      this.cd.markForCheck();
    });
  }
}
