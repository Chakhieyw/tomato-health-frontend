import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Health {
  private baseUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  // 🔥 กัน cache ด้วย timestamp
  getLatestAIResult(): Observable<any> {
    return this.http.get(`${this.baseUrl}/ai-result/latest?t=${Date.now()}`, {
      withCredentials: true,
    });
  }

  // 🔥 กัน cache ด้วย timestamp
  getLatestImage(): Observable<any> {
    return this.http.get(`${this.baseUrl}/images/latest?t=${Date.now()}`);
  }
}
