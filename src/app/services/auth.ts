import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private baseUrl = 'http://localhost:8000/users';

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post(
      `${this.baseUrl}/login`,
      { username, password },
      { withCredentials: true }
    );
  }

  logout() {
    return this.http.post(
      `${this.baseUrl}/logout`,
      {},
      { withCredentials: true }
    );
  }

  me() {
    return this.http.get(
      `${this.baseUrl}/me`,
      { withCredentials: true }
    );
  }
}
