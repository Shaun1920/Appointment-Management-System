// src/app/services/doctor-profile.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DoctorProfile {
  doctorId: number;          // maps to doctor.doctorId
  doctorCode: string;        // maps to doctor.doctorCode
  doctorName: string;        // maps to doctor.doctorName
  specialization: string;
  contactNo: string;
  role: string;
  dateOfBirth: string;
  password: string;          // include password since used in updatePassword()
  status: string;
}

@Injectable({ providedIn: 'root' })
export class DoctorProfileService {
  private baseUrl = 'http://localhost:8080/api/doctors';

  constructor(private http: HttpClient) {}

  // Fetch profile by doctor code
  getDoctorByCode(code: string): Observable<DoctorProfile> {
    return this.http.get<DoctorProfile>(`${this.baseUrl}/by-code/${code}`);
  }

  // Update profile details
  updateDoctorProfile(doctor: DoctorProfile): Observable<DoctorProfile> {
    return this.http.put<DoctorProfile>(`${this.baseUrl}/update`, doctor);
  }
}