import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Appointment {
  id?: number;
  appointmentId?: string;
  patientId: string;
  doctorId: string;
  doctorName: string;
  description: string;
  time: string;
  slot: string;
  type: string;
  timestamp?: string | Date;
}

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private apiUrl = 'http://localhost:8080/api/appointments';

  constructor(private http: HttpClient) {}

  // 🔹 Get all appointments
  getAllAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.apiUrl);
  }

  // 🔹 Create a new appointment
  createAppointment(a: Appointment): Observable<Appointment> {
    return this.http.post<Appointment>(this.apiUrl, a);
  }

  // 🔹 Update appointment
  updateAppointment(id: number, a: Appointment): Observable<Appointment> {
    return this.http.put<Appointment>(`${this.apiUrl}/${id}`, a);
  }

  // 🔹 Delete appointment
  deleteAppointment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // 🔹 Get single appointment by ID (optional)
  getAppointmentById(id: number): Observable<Appointment> {
    return this.http.get<Appointment>(`${this.apiUrl}/${id}`);
  }

  searchByPatientId(patientId: string): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.apiUrl}/search/${patientId}`);
  }
}