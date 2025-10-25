import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Staff {
  staffId?: number;
  staffCode?: string;
  name: string;
  contactNo: string;
  role: string;
  dateOfBirth: string;
  password?: string;
  status?: string;
}

@Injectable({
  providedIn: 'root'
})
export class StaffService {
  private apiUrl = 'http://localhost:8080/api/staff';

  constructor(private http: HttpClient) {}

  getStaff(): Observable<Staff[]> {
    return this.http.get<Staff[]>(`${this.apiUrl}/all`);
  }

  addStaff(staff: Staff): Observable<Staff> {
    return this.http.post<Staff>(`${this.apiUrl}/add`, staff);
  }

  updateStatus(id: number, status: string): Observable<Staff> {
    return this.http.put<Staff>(`${this.apiUrl}/update-status/${id}?status=${status}`, {});
  }
}
