// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class PatientService {
//   private baseUrl = 'http://localhost:8080/api/patients';

//   constructor(private http: HttpClient) {}

//   registerPatient(patient: any): Observable<any> {
//     return this.http.post(`${this.baseUrl}/register`, patient);
//   }

//   getAllPatients(): Observable<any[]> {
//     return this.http.get<any[]>(this.baseUrl);
//   }

//   getPatientByMobile(mobileNo: string): Observable<any> {
//     return this.http.get<any>(`${this.baseUrl}/search?mobileNo=${mobileNo}`);
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Patient {
  id?: number;
  patientCode?: string;
  name: string;
  dateOfBirth: string;
  gender: string;
  mobileNo: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class PatientService {
  private apiUrl = 'http://localhost:8080/api/patients';

  constructor(private http: HttpClient) {}

  getAllPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.apiUrl}/all`);
  }

  registerPatient(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(`${this.apiUrl}/register`, patient).pipe(
      catchError(error => {
        let msg = 'Error registering patient.';
        // Prefer backend message if provided (400/409)
        if ((error.status === 400 || error.status === 409) && typeof error.error === 'string') {
          msg = error.error;
        }
        return throwError(() => new Error(msg));
      })
    );
  }

  getPatientByMobile(mobileNo: string): Observable<Patient> {
    return this.http.get<Patient>(`${this.apiUrl}/search`, { params: { mobileNo } }).pipe(
      catchError(error => {
        let msg = 'No patient found.';
        if (typeof error.error === 'string') msg = error.error;
        return throwError(() => new Error(msg));
      })
    );
  }
}