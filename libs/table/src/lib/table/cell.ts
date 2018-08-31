// tslint:disable use-host-property-decorator use-input-property-decorator directive-class-suffix component-class-suffix
// tslint:disable max-classes-per-file no-input-rename directive-selector
import { Directive, ElementRef, Input } from '@angular/core';
import { CdkCell, CdkCellDef, CdkColumnDef, CdkHeaderCell, CdkHeaderCellDef, } from '@angular/cdk/table';

export const _AukCellDef = CdkCellDef;
export const _AukHeaderCellDef = CdkHeaderCellDef;
export const _AukColumnDef = CdkColumnDef;
export const _AukHeaderCell = CdkHeaderCell;
export const _AukCell = CdkCell;

@Directive({
  selector: '[aukCellDef]',
  providers: [{provide: CdkCellDef, useExisting: AukCellDef}]
})
export class AukCellDef extends _AukCellDef {
}

@Directive({
  selector: '[aukHeaderCellDef]',
  providers: [{provide: CdkHeaderCellDef, useExisting: AukHeaderCellDef}]
})
export class AukHeaderCellDef extends _AukHeaderCellDef {
}

@Directive({
  selector: '[aukColumnDef]',
  providers: [{provide: CdkColumnDef, useExisting: AukColumnDef}],
})
export class AukColumnDef extends _AukColumnDef {
  @Input('aukColumnDef') public name: string;
}

@Directive({
  selector: 'auk-header-cell',
  host: {
    class: 'auk-header-cell',
    role: 'columnheader',
  },
})
export class AukHeaderCell extends _AukHeaderCell {
  constructor(columnDef: CdkColumnDef,
              elementRef: ElementRef) {
    super(columnDef, elementRef);
    elementRef.nativeElement.classList.add(`auk-column-${columnDef.cssClassFriendlyName}`);
  }
}

@Directive({
  selector: 'auk-cell',
  host: {
    class: 'auk-cell',
    role: 'gridcell',
  },
})
export class AukCell extends _AukCell {
  constructor(columnDef: CdkColumnDef,
              elementRef: ElementRef) {
    super(columnDef, elementRef);
    elementRef.nativeElement.classList.add(`auk-column-${columnDef.cssClassFriendlyName}`);
  }
}
