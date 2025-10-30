// // import { Injectable } from '@angular/core';
// // import { HttpClient } from '@angular/common/http';
// // import { Observable } from 'rxjs';

// // interface LoginResponse {
// //   allowed: boolean;
// //   reason: 'bypass' | 'activated' | 'deactivate' | 'invalid_credentials';
// //   doctorId?: number;
// //   doctorCode?: string;
// //   doctorName?: string;
// //   message?: string;
// // }

// // @Injectable({ providedIn: 'root' })
// // export class DoctorAuthService {
// //   private baseUrl = 'http://localhost:8080/api/auth/doctor'; // proxy to Spring Boot (configure Angular proxy if needed)
// //   // http://localhost:8080/api/doctors

// //   constructor(private http: HttpClient) {}

// //   login(doctorCode: string, password: string): Observable<LoginResponse> {
// //     return this.http.post<LoginResponse>(`${this.baseUrl}/login`, { doctorCode, password });
// //   }

// //   setSession(info: Partial<LoginResponse>) {
// //     localStorage.setItem('doctorSession', JSON.stringify(info));
// //   }

// //   isLoggedIn(): boolean {
// //     const s = localStorage.getItem('doctorSession');
// //     return !!s;
// //   }

// //   logout() {
// //     localStorage.removeItem('doctorSession');
// //   }
// // }

// // src/app/service/Doctor Service/doctor-auth-service.service.ts
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// export interface LoginResponse {
//   allowed: boolean;
//   reason: 'bypass' | 'activated' | 'not_activated' | 'invalid_credentials';
//   role?: 'doctor' | 'staff'; // <-- allow role
//   doctorId?: number;
//   doctorCode?: string;
//   doctorName?: string;
//   message?: string;
// }

// @Injectable({ providedIn: 'root' })
// export class DoctorAuthService {
//   private baseUrl = 'http://localhost:8080/api/auth/doctor';

//   constructor(private http: HttpClient) {}

//   login(doctorCode: string, password: string): Observable<LoginResponse> {
//     return this.http.post<LoginResponse>(`${this.baseUrl}/login`, { doctorCode, password });
//   }

//   setSession(info: Partial<LoginResponse>) {
//     localStorage.setItem('userSession', JSON.stringify(info)); // use one key for both roles
//   }

//   getSession(): Partial<LoginResponse> | null {
//     const s = localStorage.getItem('userSession');
//     return s ? JSON.parse(s) : null;
//   }

//   isLoggedIn(): boolean {
//     return !!this.getSession();
//   }

//   hasRole(role: 'doctor' | 'staff'): boolean {
//     const s = this.getSession();
//     return !!s?.role && s.role === role;
//   }

//   logout() {
//     localStorage.removeItem('userSession');
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LoginResponse {
  allowed: boolean;
  reason: 'bypass' | 'activated' | 'not_activated' | 'invalid_credentials';
  role?: 'doctor' | 'staff';
  doctorId?: number;
  doctorCode?: string;
  doctorName?: string;
  message?: string;
}

@Injectable({ providedIn: 'root' })
export class DoctorAuthService {
  private baseUrl = 'http://localhost:8080/api/auth/doctor';

  constructor(private http: HttpClient) {}

  login(doctorCode: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, { doctorCode, password });
  }

  setSession(info: Partial<LoginResponse>) {
    localStorage.setItem('userSession', JSON.stringify(info));
  }

  getSession(): Partial<LoginResponse> | null {
    const s = localStorage.getItem('userSession');
    return s ? JSON.parse(s) : null;
  }

  isLoggedIn(): boolean {
    return !!this.getSession();
  }

  hasRole(role: 'doctor' | 'staff'): boolean {
    const s = this.getSession();
    return !!s?.role && s.role === role;
  }

  logout() {
    localStorage.removeItem('userSession');
  }
}
