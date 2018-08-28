import { Observable } from 'rxjs';

export interface AukTableDatabase<T> {
  load(params): Observable<T>;
}
