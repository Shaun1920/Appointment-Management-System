
import { Injectable } from '@angular/core';
import { Staff } from '../../model/Admin-Staff Model/staff.model';

@Injectable({
  providedIn: 'root'
})
export class StaffService {
  private staffList: Staff[] = [];

  getStaff(): Staff[] {
    return this.staffList;
  }

  addStaff(newStaff: Staff) {
    this.staffList.push(newStaff);
  }

  updateStatus(staffId: string, status: string) {
    const staff = this.staffList.find(s => s.staffId === staffId);
    if (staff) staff.status = status;
  }
}
