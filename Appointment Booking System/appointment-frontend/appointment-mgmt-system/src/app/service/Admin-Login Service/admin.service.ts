import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { Admin } from '../model/admin.model';
import { Admin } from 'src/app/model/Admin-Login Model/admin.model';

@Injectable({
  providedIn: 'root'  // ✅ ensures it can be injected anywhere
})
export class AdminService {
  constructor(private http: HttpClient) {}

  login(admin: Admin): Observable<any> {
    // Replace URL with your backend
    return this.http.post('http://localhost:8080/api/admin/login', admin);
  }
}
