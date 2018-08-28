import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  QueryList,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AukFilterDirective } from './filter.directive';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'auk-table-filters',
  templateUrl: './table-filters.component.html',
  styleUrls: ['./table-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AukTableFiltersComponent implements AfterViewInit, OnDestroy {

  @Input() public dataSource;
  @Output() public filterChanges = new EventEmitter();
  @ViewChild('filterContainer', { read: ViewContainerRef }) public container: ViewContainerRef;
  @ContentChildren(AukFilterDirective) public filters: QueryList<AukFilterDirective>;

  public fg = new FormGroup({});

  private fgValueChanges: Subscription;
  private filtersChanges: Subscription;

  constructor(private cd: ChangeDetectorRef) {
  }

  public ngAfterViewInit() {
    this.initializeFilters();
    this.filtersChanges = this.filters.changes.subscribe(() => {
      this.initializeFilters();
    });
  }

  public ngOnDestroy() {
    if (this.fgValueChanges) {
      this.fgValueChanges.unsubscribe();
    }
    this.filtersChanges.unsubscribe();
  }

  private initializeFilters() {
    this.container.clear();
    this.fg = new FormGroup({});
    this.fgValueChanges = null;
    this.filters.forEach((filter) => {
      if (!this.fg.contains(filter.key)) {
        this.fg.addControl(filter.key, new FormControl());
        this.container.createEmbeddedView(filter.template, {
          $implicit: this.fg.get(filter.key)
        });
        this.cd.detectChanges();
      }
    });
    this.fgValueChanges = this.fg.valueChanges.pipe(debounceTime(300))
      .subscribe((value) => {
        this.filterChanges.emit(value);
        if (this.dataSource) {
          this.dataSource.filter$.next(value);
        }
      });
  }

}
