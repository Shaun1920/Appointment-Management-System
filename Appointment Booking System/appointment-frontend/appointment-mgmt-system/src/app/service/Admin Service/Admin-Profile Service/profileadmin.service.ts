import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profileadmin } from '../../../model/Admin Model/Admin-Profile Model/profileadmin.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileadminService {
  private baseUrl = 'http://localhost:8080/api/admin'; // change if your backend URL differs

  constructor(private http: HttpClient) {}

  // Fetch admin profile
  getProfile(adminId: string): Observable<Profileadmin> {
    return this.http.get<Profileadmin>(`${this.baseUrl}/profile/${adminId}`);
  }

  // Update admin profile
  updateProfile(originalAdminId: string, profile: Profileadmin): Observable<any> {
    return this.http.put(`${this.baseUrl}/profile/update/${originalAdminId}`, profile);
  }
}
