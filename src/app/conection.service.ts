import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConectionService {

  constructor(private http: HttpClient) { }
  getDb(code): Observable<any> {
    return this.http.get('http://localhost:3000/getDb?code='+code);
  }
  saveDb(information): Observable<any> {
    return this.http.post('http://localhost:3000/save',information);
  }
}
