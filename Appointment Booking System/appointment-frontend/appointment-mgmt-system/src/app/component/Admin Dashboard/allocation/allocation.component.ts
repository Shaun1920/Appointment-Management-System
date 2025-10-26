// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms'; // <-- add this
// import { HttpClientModule } from '@angular/common/http';
// // import { AllocationService } from '../services/allocation.service';
// // import { DoctorService, Doctor } from '../services/doctor.service';
// // import { Allocation } from './allocation.model';
// import { Allocation } from '../model/allocation.model';
// import { DoctorService,Doctor } from '../service/Admin-Doctor Service/doctor.service';
// import { AllocationService } from '../service/allocation.service';

// @Component({
//   selector: 'app-allocation',
//   standalone: true, // <-- standalone component
//   imports: [CommonModule, FormsModule, HttpClientModule], // <-- import FormsModule here
//   templateUrl: './allocation.component.html',
//   styleUrls: ['./allocation.component.css']
// })
// export class AllocationComponent implements OnInit {

//   doctors: Doctor[] = [];
//   allocations: Allocation[] = [];

//   allocation: Allocation = {
//     doctorCode: '',
//     floorRoomNo: '',
//     shift: '',
//     date: '',
//     time: ''
//   };

//   isEdit: boolean = false;

//   constructor(private doctorService: DoctorService, private allocationService: AllocationService) {}

//   ngOnInit(): void {
//     this.getDoctors();
//     this.getAllocations();
//   }

//   getDoctors() {
//     this.doctorService.getDoctors().subscribe(docs => this.doctors = docs);
//   }

//   getAllocations() {
//     this.allocationService.getAllocations().subscribe(data => this.allocations = data);
//   }

//   saveAllocation() {
//     if(this.isEdit){
//       this.allocationService.updateAllocation(this.allocation).subscribe(() => this.getAllocations());
//       this.isEdit = false;
//     } else {
//       this.allocationService.addAllocation(this.allocation).subscribe(() => this.getAllocations());
//     }
//     this.resetForm();
//   }

//   editAllocation(a: Allocation) {
//     this.allocation = {...a};
//     this.isEdit = true;
//   }

//   removeAllocation(id: number) {
//     this.allocationService.deleteAllocation(id).subscribe(() => this.getAllocations());
//   }

//   resetForm() {
//     this.allocation = { doctorCode: '', floorRoomNo: '', shift: '', date: '', time: '' };
//   }

// }

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// import { AllocationService } from '../services/allocation.service';
// import { DoctorService, Doctor } from '../services/doctor.service';
// import { Allocation } from './allocation.model';
import { Allocation } from '../../../model/Admin Model/Admin-Allocation Model/allocation.model';
import { DoctorService,Doctor } from '../../../service/Admin Service/Admin-Doctor Service/doctor.service';
import { AllocationService } from '../../../service/Admin Service/Admin-Allocation Service/allocation.service';

@Component({
  selector: 'app-allocation',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './allocation.component.html',
  styleUrls: ['./allocation.component.css']
})
export class AllocationComponent implements OnInit {

  doctors: Doctor[] = [];
  allocations: Allocation[] = [];

  allocation: Allocation = {
    doctorCode: '',
    floorRoomNo: '',
    shift: '',
    date: '',
    time: ''
  };

  isEdit: boolean = false;
  showModal: boolean = false; // <-- controls modal visibility

  constructor(private doctorService: DoctorService, private allocationService: AllocationService) {}

  ngOnInit(): void {
    this.getDoctors();
    this.getAllocations();
  }

  // Modal controls
  openModal() {
    this.resetForm();
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  // Fetch doctors for dropdown
  getDoctors() {
    this.doctorService.getDoctors().subscribe(docs => this.doctors = docs);
  }

  // Fetch allocations for table
  getAllocations() {
    this.allocationService.getAllocations().subscribe(data => this.allocations = data);
  }

  // Save or update allocation
  saveAllocation() {
    if (this.isEdit) {
      this.allocationService.updateAllocation(this.allocation).subscribe(() => {
        this.getAllocations();
        this.closeModal();
      });
      this.isEdit = false;
    } else {
      this.allocationService.addAllocation(this.allocation).subscribe(() => {
        this.getAllocations();
        this.closeModal();
      });
    }
  }

  // Edit allocation
  editAllocation(a: Allocation) {
    this.allocation = { ...a };
    this.isEdit = true;
    this.showModal = true;
  }

  // Delete allocation
  deleteAllocation(id: number) {
    this.allocationService.deleteAllocation(id).subscribe(() => this.getAllocations());
  }

  // Reset form
  resetForm() {
    this.allocation = { doctorCode: '', floorRoomNo: '', shift: '', date: '', time: '' };
  }

}
