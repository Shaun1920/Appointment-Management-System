import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { Staff, StaffService } from '../services/staff.service';
import { StaffService,Staff } from 'src/app/service/Admin Service/Admin-Staff Service/staff.service';

@Component({
  selector: 'app-staff',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {
  staffList: Staff[] = [];
  showForm = false;
  errorMessage = '';
  newStaff: Staff = { name: '', contactNo: '', role: '', dateOfBirth: '' };

  constructor(private staffService: StaffService) {}

  ngOnInit() {
    this.loadStaff();
  }

  loadStaff() {
    this.staffService.getStaff().subscribe(data => this.staffList = data);
  }

  openForm() { this.showForm = true; }
  closeForm() {
    this.showForm = false;
    this.newStaff = { name: '', contactNo: '', role: '', dateOfBirth: '' };
    this.errorMessage = '';
  }

  // addStaff() {
  //   const contactPattern = /^(7|8|9)[0-9]{9}$/;
  //   if (!contactPattern.test(this.newStaff.contactNo)) {
  //     alert('Contact number must be 10 digits and start with 7, 8, or 9.');
  //     return;
  //   }

  //   this.staffService.addStaff(this.newStaff).subscribe(() => {
  //     this.loadStaff();
  //     this.closeForm();
  //   });
  // }

    addStaff() {
    const contactPattern = /^(7|8|9)[0-9]{9}$/;
    if (!contactPattern.test(this.newStaff.contactNo)) {
      this.errorMessage = 'Contact number must be 10 digits and start with 7, 8, or 9.';
      return;
    }

    this.staffService.addStaff(this.newStaff).subscribe({
      next: () => {
        this.loadStaff();
        this.closeForm();
        this.errorMessage = '';
      },
      error: (err) => {
        this.errorMessage = err.message; // e.g., "Contact number already exists..."
      }
    });
  }

  approveStaff(staff: Staff) {
    this.staffService.updateStatus(staff.staffId!, 'Activated').subscribe(() => this.loadStaff());
  }

  rejectStaff(staff: Staff) {
    this.staffService.updateStatus(staff.staffId!, 'Deactivated').subscribe(() => this.loadStaff());
  }
}
