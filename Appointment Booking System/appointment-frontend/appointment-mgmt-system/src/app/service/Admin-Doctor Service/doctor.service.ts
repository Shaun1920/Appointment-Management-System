import { Injectable } from '@angular/core';
import { Doctor } from '../../model/Admin-Doctor Model/doctor.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private doctors: Doctor[] = [];

  getDoctors(): Doctor[] {
    return this.doctors;
  }

  addDoctor(newDoctor: Doctor) {
    this.doctors.push(newDoctor);
  }

  updateStatus(doctorId: string, status: string) {
    const doc = this.doctors.find(d => d.doctorId === doctorId);
    if (doc) doc.status = status;
  }
}
