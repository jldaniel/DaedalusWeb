import {System} from './System';

import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DaedalusService {

  constructor(private http: HttpClient) { }

  getSystems(): Observable<System[]> {
    const headers = this.createHeaders();
    const systemsUrl = 'http://127.0.0.1:8000/systems/';
    return this.http.get<System[]>(systemsUrl, {headers: this.createHeaders()});
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
