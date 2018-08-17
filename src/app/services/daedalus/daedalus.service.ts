import {System} from './System';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataSet } from './DataSet';


@Injectable({
  providedIn: 'root'
})
export class DaedalusService {

  rootUrl = 'http://127.0.0.1:8000';
  systemsUrl = this.rootUrl + '/systems/';
  datasetsUrl = this.rootUrl + '/datasets/';

  constructor(private http: HttpClient) { }

  getSystems(): Observable<System[]> {
    return this.http.get<System[]>(this.systemsUrl, {headers: this.createHeaders()});
  }

  createSystem(system: System): Observable<System> {
    return this.http.post<System>(this.systemsUrl, system, {headers: this.createHeaders()});
  }

  getSystem(systemId: number): Observable<System> {
    const url = this.systemsUrl + systemId + '/';
    console.log(url);
    return this.http.get<System>(url, {headers: this.createHeaders()});
  }

  deleteSystem(systemId: number): Observable<any> {
    return this.http.delete(this.systemsUrl + systemId, {headers: this.createHeaders()});
  }

  getDatasets(systemId: number): Observable<DataSet[]> {
    const url = this.systemsUrl + systemId;
    return this.http.get<DataSet[]>(url, {headers: this.createHeaders()});
  }

  createDataSet(systemId: number, dataset: DataSet): Observable<DataSet> {
    const url = this.systemsUrl + systemId + '/datasets/';
    return this.http.post<DataSet>(url, dataset, {headers: this.createHeaders()});
  }

  getDataSet(dataSetId: number): Observable<DataSet> {
    const url = this.datasetsUrl + dataSetId;
    return this.http.get<DataSet>(url, {headers: this.createHeaders()});
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
