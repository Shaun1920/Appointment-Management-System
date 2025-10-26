import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Allocation } from '../../../model/Admin Model/Admin-Allocation Model/allocation.model';

@Injectable({
  providedIn: 'root'
})
export class AllocationService {
  private apiUrl = 'http://localhost:8080/api/allocations';

  constructor(private http: HttpClient) {}

  getAllocations(): Observable<Allocation[]> {
    return this.http.get<Allocation[]>(`${this.apiUrl}/all`);
  }

  addAllocation(allocation: Allocation): Observable<Allocation> {
    return this.http.post<Allocation>(`${this.apiUrl}/add`, allocation);
  }

  updateAllocation(allocation: Allocation): Observable<Allocation> {
    return this.http.put<Allocation>(`${this.apiUrl}/update`, allocation);
  }

  deleteAllocation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
