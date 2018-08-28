import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { AukSortHeaderComponent } from './sort-header.component';
import { SortValue } from './sort-value';

@Directive({
  selector: '[aukSort]'
})
export class AukSortDirective {

  @Input() public dataSource;
  @Input() public active: string;

  @Input() public start: 'asc' | 'desc' = 'asc';
  @Output() public sortChange = new EventEmitter<SortValue>();

  @Input()
  public get direction() {
    return this._direction;
  }

  public set direction(direction) {
    this._direction = direction;
  }

  private _direction: 'asc' | 'desc';

  constructor() {
  }

  public sort(sortable: AukSortHeaderComponent) {
    if (this.active !== sortable.id) {
      this.active = sortable.id;
      this.direction = sortable.start || this.start;
    } else {
      this.direction = this.changeSortableDirection(sortable);
    }
    let value: SortValue = { active: this.active, direction: this.direction };
    if (!this.direction) {
      value = null;
    }
    this.sortChange.emit(value);
    if (this.dataSource) {
      this.dataSource.sort$.next(value);
    }
  }

  private changeSortableDirection(sortable: AukSortHeaderComponent): any {
    const sortableStart = sortable.start || this.start;
    const sortableStates = ['asc', 'desc'];
    if (sortableStart === 'desc') {
      sortableStates.reverse();
    }
    sortableStates.push(null);
    const nextIndex = sortableStates.indexOf(this.direction) + 1;
    return nextIndex >= sortableStates.length ? sortableStates[0] : sortableStates[nextIndex];
  }

}
