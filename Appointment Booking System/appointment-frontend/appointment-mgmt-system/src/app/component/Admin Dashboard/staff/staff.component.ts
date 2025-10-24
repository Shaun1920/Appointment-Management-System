import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Staff {
  staffId: string;
  name: string;
  contactNo: string;
  role: string;
  status: string;
}

@Component({
  selector: 'app-staff',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent {
  staffList: Staff[] = [];
  showForm = false;

  newStaff = {
    name: '',
    contactNo: '',
    role: ''
  };

  openForm() {
    this.showForm = true;
  }

  closeForm() {
    this.showForm = false;
    this.newStaff = { name: '', contactNo: '', role: '' };
  }

  addStaff() {
    const id = 'staff' + String(this.staffList.length + 1).padStart(3, '0');
    this.staffList.push({
      staffId: id,
      name: this.newStaff.name,
      contactNo: this.newStaff.contactNo,
      role: this.newStaff.role,
      status: 'Pending'
    });
    this.closeForm();
  }

  approveStaff(staff: Staff) {
    staff.status = 'Activated';
  }

  rejectStaff(staff: Staff) {
    staff.status = 'Deactivated';
  }
}