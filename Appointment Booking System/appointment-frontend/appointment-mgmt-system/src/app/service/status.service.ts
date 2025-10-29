// src/app/service/status.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DoctorStatus {
  id?: number;
  doctorCode: string;
  currentStatus?: 'Available' | 'Busy' | 'On Leave' | string;
  accountStatus?: 'Active' | 'Inactive' | string;
  upcomingLeave?: string;
  appointmentsToday?: number;
  updatedAt?: string;
}

@Injectable({ providedIn: 'root' })
export class StatusService {
  private baseUrl = 'http://localhost:8080/api/status';

  constructor(private http: HttpClient) {}

  upsert(payload: DoctorStatus): Observable<DoctorStatus> {
    return this.http.post<DoctorStatus>(`${this.baseUrl}/upsert`, payload);
  }

  setAvailability(doctorCode: string, currentStatus: string): Observable<DoctorStatus> {
    return this.http.put<DoctorStatus>(`${this.baseUrl}/availability`, { doctorCode, currentStatus });
  }

  setAccount(doctorCode: string, accountStatus: string): Observable<DoctorStatus> {
    return this.http.put<DoctorStatus>(`${this.baseUrl}/account`, { doctorCode, accountStatus });
  }

  getAll(): Observable<DoctorStatus[]> {
    return this.http.get<DoctorStatus[]>(`${this.baseUrl}/all`);
  }

  getOne(doctorCode: string): Observable<DoctorStatus> {
    return this.http.get<DoctorStatus>(`${this.baseUrl}/${doctorCode}`);
  }

  getAllStatuses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/all`);
  }
}