import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HealthResponse } from '../models/health';
import { Observable } from 'rxjs';
import { AIResultResponse } from '../models/ai-result';
@Injectable({
  providedIn: 'root',
})
export class Health {
  private baseUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  getLatestAIResult() {
    return this.http.get<any>('http://localhost:8000/ai-result/latest', {
      withCredentials: true,
    });
  }

  getLatestImage(): Observable<any> {
    return this.http.get<any>('http://localhost:8000/images/latest');
  }
}
