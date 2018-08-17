import { AfterViewInit, HostBinding, Input, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormGroupDirective, NgControl } from '@angular/forms';


export abstract class AukErrorBase implements AfterViewInit, OnDestroy {
  @Input()
  @HostBinding('hidden')
  public hidden = true;

  protected control: NgControl | FormGroupDirective;
  protected source: Observable<boolean | string>;
  protected until$: Subject<void> = new Subject<void>();

  protected abstract connect(): Observable<boolean | string> | null;

  protected abstract statusChangesHandler(invalid: boolean): void;

  public ngAfterViewInit() {
    this.source = this.connect();
    if (!this.source) {
      setTimeout(() => this.hidden = false, 0);
      return;
    }
    this.source.pipe(takeUntil(this.until$))
      .subscribe(this.statusChangesHandler.bind(this));
  }

  public ngOnDestroy() {
    this.until$.next();
    this.until$.complete();
  }
}
