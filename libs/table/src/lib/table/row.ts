// tslint:disable use-host-property-decorator use-input-property-decorator directive-class-suffix component-class-suffix
// tslint:disable max-classes-per-file no-input-rename
import { ChangeDetectionStrategy, Component, Directive, ViewEncapsulation } from '@angular/core';
import { CDK_ROW_TEMPLATE, CdkHeaderRow, CdkHeaderRowDef, CdkRow, CdkRowDef, } from '@angular/cdk/table';

/** Workaround for https://github.com/angular/angular/issues/17849 */
export const _AukHeaderRowDef = CdkHeaderRowDef;
export const _AukCdkRowDef = CdkRowDef;
export const _AukHeaderRow = CdkHeaderRow;
export const _AukRow = CdkRow;

@Directive({
  selector: '[aukHeaderRowDef]',
  providers: [{provide: CdkHeaderRowDef, useExisting: AukHeaderRowDef}],
  inputs: ['columns: aukHeaderRowDef'],
})
export class AukHeaderRowDef extends _AukHeaderRowDef {
}

@Directive({
  selector: '[aukRowDef]',
  providers: [{provide: CdkRowDef, useExisting: AukRowDef}],
  inputs: ['columns: aukRowDefColumns', 'when: aukRowDefWhen'],
})
export class AukRowDef<T> extends _AukCdkRowDef<T> {
}

@Component({
  selector: 'auk-header-row',
  template: CDK_ROW_TEMPLATE,
  host: {
    class: 'auk-header-row',
    role: 'row',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'aukHeaderRow',
  // preserveWhitespaces: false,
})
export class AukHeaderRow extends _AukHeaderRow {
}

@Component({
  selector: 'auk-row',
  template: CDK_ROW_TEMPLATE,
  host: {
    class: 'auk-row',
    role: 'row',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'aukRow',
  // preserveWhitespaces: false,
})
export class AukRow extends _AukRow {
}
