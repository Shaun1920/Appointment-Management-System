import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class VisitFollowupService {
  private baseUrl = 'http://localhost:8080/api/staff/tracker';

  constructor(private http: HttpClient) {}

  getAllFollowups(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/all`);
  }

  markPaymentCompleted(appointmentId: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/updatePaymentStatus/${appointmentId}`, {});
  }
}
