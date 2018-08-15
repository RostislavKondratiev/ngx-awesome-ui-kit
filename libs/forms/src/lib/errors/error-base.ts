import { AfterViewInit, HostBinding, Input, OnDestroy } from '@angular/core';
import { Observable, Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormControl, FormGroupDirective } from '@angular/forms';


export abstract class AukErrorBase implements AfterViewInit, OnDestroy {
  @Input()
  @HostBinding('hidden')
  public hidden = true;

  protected control: FormControl | FormGroupDirective;
  protected source: Observable<boolean | string>;
  protected until$: Subject<void> = new Subject<void>();

  protected abstract connect(): Observable<boolean | string> | null;

  protected abstract statusChangesHandler(invalid: boolean): void;

  public ngAfterViewInit() {
    this.source = this.connect();
    if (!this.source) {
      timer(0).subscribe(() => this.hidden = false);
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
