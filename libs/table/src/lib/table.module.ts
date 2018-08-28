import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AukTableFiltersComponent } from './table-filters/table-filters.component';
import { AukFilterDirective } from './table-filters/filter.directive';
import { AukTable } from './table/table';
import { AukCell, AukCellDef, AukColumnDef, AukHeaderCell, AukHeaderCellDef } from './table/cell';
import { AukHeaderRow, AukHeaderRowDef, AukRow, AukRowDef } from './table/row';
import { AukSortDirective } from './table-sort/sort.directive';
import { AukSortHeaderComponent } from './table-sort/sort-header.component';
import { CdkTableModule } from '@angular/cdk/table';

const CDK_TABLE = [
  AukTable,
  AukCell,
  AukCellDef,
  AukHeaderCell,
  AukHeaderCellDef,
  AukColumnDef,
  AukRow,
  AukRowDef,
  AukHeaderRow,
  AukHeaderRowDef
];

const COMPONENTS = [
  AukTableFiltersComponent,
  AukSortHeaderComponent
];

const DIRECTIVES = [
  AukFilterDirective,
  AukSortDirective
];

@NgModule({
  imports: [
    CommonModule,
    CdkTableModule
  ],
  declarations: [
    ...CDK_TABLE,
    ...COMPONENTS,
    ...DIRECTIVES
  ],
  exports: [
    CdkTableModule,
    ...CDK_TABLE,
    ...COMPONENTS,
    ...DIRECTIVES
  ]
})
export class AukTableModule {
}
