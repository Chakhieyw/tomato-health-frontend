import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HealthService {
  private apiUrl = 'http://127.0.0.1:8000/api/health-check';

  constructor(private http: HttpClient) {}

  getHealthCheck(status: 'normal' | 'warning') {
    return this.http.get<any>(
      `http://127.0.0.1:8000/api/health-check?status=${status}`
    );
  }
}
