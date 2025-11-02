import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorDashboardService {
  private baseUrl = 'http://localhost:8080/api/doctor';

  constructor(private http: HttpClient) {}

  // ✅ Fetch appointments for a doctor
  getAppointments(doctorId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${doctorId}/appointments`);
  }

  // ✅ Mark appointment as "Visited"
  markVisited(appointmentId: string, patientId: string): Observable<any> {
    const body = {
      followupDate: new Date().toISOString().split('T')[0], // today’s date
      notes: "Visited and follow-up recorded"
    };

    return this.http.post(
      `${this.baseUrl}/visitfollowup/${appointmentId}/visit?patientId=${patientId}`,
      body
    );
  }

  // ✅ Schedule a follow-up (updates same record instead of creating new)
  scheduleFollowup(appointmentId: string, patientId: string, followupDate: string): Observable<any> {
    const body = {
      followupDate: followupDate,
      notes: "Follow-up scheduled"
    };

    return this.http.post(
      `${this.baseUrl}/visitfollowup/${appointmentId}/visit?patientId=${patientId}`,
      body
    );
  }

  // ✅ Get all follow-ups by patient (for history view if needed)
  getFollowupsByPatient(patientId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/visitfollowup/patient/${patientId}`);
  }

  // ✅ Get follow-up by appointment
  getFollowupsByAppointment(appointmentId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/visitfollowup/appointment/${appointmentId}`);
  }
}
