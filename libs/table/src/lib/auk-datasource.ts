import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { catchError, skip, takeUntil, tap } from 'rxjs/operators';
import { AukTableDatabase } from './auk-database';


export class AukDatasource<T> implements DataSource<T> {

  public loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public filter$: BehaviorSubject<any> = new BehaviorSubject<any>({});
  public sort$: BehaviorSubject<any> = new BehaviorSubject<any>({});
  public page$: BehaviorSubject<any> = new BehaviorSubject<any>(1);
  public meta$: BehaviorSubject<any> = new BehaviorSubject<any>({});
  private state$: BehaviorSubject<T[]> = new BehaviorSubject<T[]>(null);
  private destroy$: Subject<void> = new Subject<void>();

  public get meta() {
    return this.meta$.getValue();
  }

  public get page() {
    if (this.meta) {
      return this.meta.page;
    }
    return 1;
  }

  constructor(private db: AukTableDatabase<T>) {
    this.load({ page: 1 });
    this.filter$.asObservable().pipe(takeUntil(this.destroy$), skip(1))
      .subscribe(() => {
        this.load({ page: 1 });
      });

    this.sort$.asObservable().pipe(takeUntil(this.destroy$), skip(1))
      .subscribe(() => {
        this.load({ page: this.page$.value });
      });

    this.page$.asObservable().pipe(takeUntil(this.destroy$), skip(1))
      .subscribe((page) => {
        this.load({ page });
      });
  }

  public connect() {
    return this.state$.asObservable();
  }

  public disconnect() {
    this.destroy$.next();
    this.destroy$.complete();
    this.state$.complete();
  }

  public load(params) {
    const allParams = { ...this.filter$.value, ...this.sort$.value, ...params };
    console.log(allParams);
    this.makeRequest(allParams).subscribe((res: any) => {
      this.state$.next(res.data);
    });
  }

  public makeRequest(params) {
    this.loading$.next(true);
    for (const value in params) {
      if (params.hasOwnProperty(value)) {
        if (!params[value]) {
          delete params[value];
        }
      }
    }
    return this.db.load(params).pipe(
      tap(() => this.loading$.next(false)),
      catchError((err) => {
        this.loading$.next(false);
        return throwError(err);
      })
    );
  }
}
