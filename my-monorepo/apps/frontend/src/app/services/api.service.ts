import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Options } from '../types';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  get<T>(url: string, options: Options): Observable<T> {
    return this.httpClient.get<T>(url, options);
  }

  post<T>(url: string, body: unknown, options: Options): Observable<T> {
    return this.httpClient.post<T>(url, body, options);
  }

  put<T>(url: string, body: unknown, options: Options): Observable<T> {
    return this.httpClient.put<T>(url, body, options);
  }

  delete<T>(url: string, options: Options): Observable<T> {
    return this.httpClient.delete<T>(url, options);
  }
}
