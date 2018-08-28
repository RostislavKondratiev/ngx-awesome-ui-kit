import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  Optional,
  ViewEncapsulation
} from '@angular/core';
import { arrowPosition } from './sort-animations';
import { AukSortDirective } from './sort.directive';
import { CdkColumnDef } from '@angular/cdk/table';

@Component({
  selector: '[auk-sort-header]', //tslint:disable-line
  templateUrl: './sort-header.component.html',
  styleUrls: ['./sort-header.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [arrowPosition]
})
export class AukSortHeaderComponent implements OnInit {

  @Input()
  public id: string;

  @Input()
  public start: 'asc' | 'desc';

  constructor(
    @Optional() private sort: AukSortDirective,
    @Optional() public _cdkColumnDef: CdkColumnDef,
    private cd: ChangeDetectorRef) {
    if (this.sort) {
      this.sort.sortChange.subscribe((value) => {
        this.cd.detectChanges();
      });
    }
  }

  ngOnInit() {
    if (!this.id && this._cdkColumnDef) {
      this.id = this._cdkColumnDef.name;
    }
  }

  public handleClick() {
    this.sort.sort(this);
  }

  public get arrowDirection() {
    if (this.sort) {
      return this.sort.active === this.id && this.sort.direction || null;
    }
  }

}
