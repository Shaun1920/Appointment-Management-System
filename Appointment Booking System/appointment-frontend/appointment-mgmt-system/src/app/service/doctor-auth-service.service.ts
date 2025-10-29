import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface LoginResponse {
  allowed: boolean;
  reason: 'bypass' | 'activated' | 'deactivate' | 'invalid_credentials';
  doctorId?: number;
  doctorCode?: string;
  doctorName?: string;
  message?: string;
}

@Injectable({ providedIn: 'root' })
export class DoctorAuthService {
  private baseUrl = 'http://localhost:8080/api/auth/doctor'; // proxy to Spring Boot (configure Angular proxy if needed)
  // http://localhost:8080/api/doctors

  constructor(private http: HttpClient) {}

  login(doctorCode: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, { doctorCode, password });
  }

  setSession(info: Partial<LoginResponse>) {
    localStorage.setItem('doctorSession', JSON.stringify(info));
  }

  isLoggedIn(): boolean {
    const s = localStorage.getItem('doctorSession');
    return !!s;
  }

  logout() {
    localStorage.removeItem('doctorSession');
  }
}