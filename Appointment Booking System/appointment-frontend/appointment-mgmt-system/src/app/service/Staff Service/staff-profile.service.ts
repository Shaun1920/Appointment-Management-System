import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface StaffProfile {
  staffId?: number;
  staffCode: string;
  name: string;
  contactNo: string;
  role: string;
  dateOfBirth: string;
  password?: string;
}

@Injectable({
  providedIn: 'root'
})
export class StaffProfileService {
  private apiUrl = 'http://localhost:8080/api/staff';

  constructor(private http: HttpClient) {}

  getStaffByCode(staffCode: string): Observable<StaffProfile> {
    return this.http.get<StaffProfile>(`${this.apiUrl}/${staffCode}`);
  }

  updateStaffProfile(staff: StaffProfile): Observable<StaffProfile> {
    return this.http.put<StaffProfile>(`${this.apiUrl}/update`, staff);
  }
}
