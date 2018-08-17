import {System} from './System';

import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DaedalusService {

  rootUrl = 'http://127.0.0.1:8000';
  systemsUrl = this.rootUrl + '/systems/';

  constructor(private http: HttpClient) { }

  getSystems(): Observable<System[]> {
    return this.http.get<System[]>(this.systemsUrl, {headers: this.createHeaders()});
  }

  createSystem(system: System): Observable<System> {
    return this.http.post<System>(this.systemsUrl, system, {headers: this.createHeaders()});
  }

  /**
   * Put together the headers for the REST request
   *
   * @returns {Headers}
   */
  private createHeaders(): HttpHeaders {
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'Accept': 'application/json'});
    return headers;
  }

}
