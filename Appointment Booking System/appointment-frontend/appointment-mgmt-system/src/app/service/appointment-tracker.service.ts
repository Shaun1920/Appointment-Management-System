import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentTrackerService {
  private baseUrl = 'http://localhost:8080/api/tracker'; // adjust if different

  constructor(private http: HttpClient) {}

  addTracker(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, data);
  }

  getAllTrackers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/all`);
  }

  getTrackerByPatientId(patientId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/patient/${patientId}`);
  }

  markVisited(patientId: number, appointmentId?: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/mark-visited/${patientId}/${appointmentId}`, {});
  }

  scheduleFollowUp(patientId: number, appointmentId: number, date: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/follow-up/${patientId}/${appointmentId}`, { followUpDate: date });
  }
}
