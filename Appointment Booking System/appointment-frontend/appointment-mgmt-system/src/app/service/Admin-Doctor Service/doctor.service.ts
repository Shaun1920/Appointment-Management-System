import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Doctor {
  doctorId?: number;
  doctorCode?: string;
  doctorName: string;
  specialization: string;
  contactNo: string;
  role: string;
  dateOfBirth: string;
  password?: string;
  status?: string;
}

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private apiUrl = 'http://localhost:8080/api/doctors';

  constructor(private http: HttpClient) {}

  getDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(`${this.apiUrl}/all`);
  }

  addDoctor(doctor: Doctor): Observable<Doctor> {
    return this.http.post<Doctor>(`${this.apiUrl}/add`, doctor);
  }

  updateStatus(id: number, status: string): Observable<Doctor> {
    return this.http.put<Doctor>(`${this.apiUrl}/update-status/${id}?status=${status}`, {});
  }
}
