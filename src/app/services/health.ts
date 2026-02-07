import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HealthResponse } from '../models/health';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class Health {
  private baseUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  getHealthCheck() {
    return this.http.get<HealthResponse>(this.baseUrl, {
      withCredentials: true,
    });
  }
   getLatestImage(): Observable<any> {
    return this.http.get<any>('http://localhost:8000/images/latest');
  }
}
