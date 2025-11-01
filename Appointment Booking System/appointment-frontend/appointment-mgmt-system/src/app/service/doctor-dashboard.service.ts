import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Appointment {
  appointmentId: string;
  description: string;
  doctorId: string;
  patientId: string;
  slot: string;
  time: string;
  type: string;
}

@Injectable({
  providedIn: 'root'
})
export class DoctorDashboardService {
  private apiUrl = 'http://localhost:8080/api/doctor';

  constructor(private http: HttpClient) {}

  getAppointments(doctorId: string): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.apiUrl}/${doctorId}/appointments`);
  }
}
