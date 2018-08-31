// tslint:disable use-host-property-decorator use-input-property-decorator directive-class-suffix component-class-suffix
// tslint:disable max-classes-per-file

import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CDK_TABLE_TEMPLATE, CdkTable } from '@angular/cdk/table';

const _AukDataTable = CdkTable;

@Component({
  selector: 'auk-table',
  template: CDK_TABLE_TEMPLATE,
  styleUrls: ['./table.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AukTable<T> extends _AukDataTable<T> {
}
