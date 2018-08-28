import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AukTableDatabase } from '@auk/table';

@Injectable()
export class UsersDatabase implements AukTableDatabase<any> {
  constructor(private http: HttpClient) {
  }

  public load(additionalParams) {
    const tmp = Object.assign({}, additionalParams);
    let params = new HttpParams();
    console.log(tmp); // tslint:disable-line
    for (const key in tmp) {
      if (tmp.hasOwnProperty(key)) {
        params = params.append(key, tmp[key]);
      }
    }
    console.log(params); // tslint:disable-line
    return this.http.get<any>(`/assets/mock-data/table-example1.json`, { params });
  }
}
