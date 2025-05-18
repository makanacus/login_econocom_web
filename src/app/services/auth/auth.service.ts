import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private API_URL = 'http://localhost:8080/api/auth/login';
  private SSO_URL = 'http://localhost:8080/api/auth/sso';

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(this.API_URL, credentials);
  }

  ssoCallback(code: string): Observable<any> {
    const url = `http://localhost:8080/api/auth/sso/callback?code=${code}`;
    return this.http.get(url);
  }
}