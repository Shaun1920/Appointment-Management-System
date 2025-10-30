// 

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface StaffLoginResponse {
  allowed: boolean;
  reason: 'bypass' | 'activated' | 'not_activated' | 'invalid_credentials';
  role?: 'staff';
  staffId?: number;
  staffCode?: string;
  staffName?: string;
  message?: string;
}

@Injectable({ providedIn: 'root' })
export class StaffAuthService {
  private baseUrl = 'http://localhost:8080/api/auth/staff';

  constructor(private http: HttpClient) {}

  login(staffCode: string, password: string): Observable<StaffLoginResponse> {
    return this.http.post<StaffLoginResponse>(`${this.baseUrl}/login`, { staffCode, password });
  }
}
