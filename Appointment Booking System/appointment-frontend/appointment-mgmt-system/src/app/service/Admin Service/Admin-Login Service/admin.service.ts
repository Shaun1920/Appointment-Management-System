import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Admin } from 'src/app/model/Admin Model/Admin-Login Model/admin.model';

@Injectable({ providedIn: 'root' })
export class AdminService {
  constructor(private http: HttpClient) {}

  login(admin: Admin): Observable<any> {
    return this.http.post('http://localhost:8080/api/admin/login', admin);
  }
  
}
