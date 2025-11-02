// src/app/service/status.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// ✅ Interface for doctor status
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

  // ✅ Add or update doctor status
  upsert(payload: DoctorStatus): Observable<DoctorStatus> {
    return this.http.post<DoctorStatus>(`${this.baseUrl}/upsert`, payload);
  }

  // ✅ Set current availability (Available | Busy | On Leave)
  setAvailability(doctorCode: string, currentStatus: string): Observable<DoctorStatus> {
    return this.http.put<DoctorStatus>(`${this.baseUrl}/availability`, { doctorCode, currentStatus });
  }

  // ✅ Set account status (Active | Inactive)
  setAccount(doctorCode: string, accountStatus: string): Observable<DoctorStatus> {
    return this.http.put<DoctorStatus>(`${this.baseUrl}/account`, { doctorCode, accountStatus });
  }

  // ✅ Get all doctor statuses
  getAll(): Observable<DoctorStatus[]> {
    return this.http.get<DoctorStatus[]>(`${this.baseUrl}/all`);
  }

  // ✅ Get single doctor status by doctorCode
  getOne(doctorCode: string): Observable<DoctorStatus> {
    return this.http.get<DoctorStatus>(`${this.baseUrl}/${doctorCode}`);
  }

  // ✅ Alias for same as getAll (if used elsewhere)
  getAllStatuses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/all`);
  }

  // ✅ NEW: Get total appointments per doctor (count only)
  getAppointmentCount(doctorId: string): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/appointments/${doctorId}`);
  }
}
