import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  // 🧩 Register a new patient
  registerPatient(patient: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/patients/register`, patient);
  }

  // 🧩 Get all registered patients (optional)
  getAllPatients(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/patients/all`);
  }
}
