import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// ✅ Interface for Allocation details
export interface Allocation {
  id: number;
  date: string;
  doctorCode: string;
  floorRoomNo: string;
  shift: string;
  time: string;
}

@Injectable({
  providedIn: 'root'
})
export class DoctorAllocationService {
  private baseUrl = 'http://localhost:8080/api/allocations';

  constructor(private http: HttpClient) {}

  /**
   * Fetch all allocation records for a specific doctor by their code.
   * Used in DoctorDashboard to display current shift/room/time details.
   */
  getByDoctorCode(doctorCode: string): Observable<Allocation[]> {
    return this.http.get<Allocation[]>(`${this.baseUrl}/doctor/${doctorCode}`);
  }
}
