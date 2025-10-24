import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIf } from '@angular/common'; // ✅ import NgIf

@Component({
  selector: 'app-doctor-staff-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf], // ✅ include NgIf here
  templateUrl: './doctor-staff-sidebar.component.html',
  styleUrls: ['./doctor-staff-sidebar.component.css']
})
export class DoctorStaffSidebarComponent {
  sidebarOpen = false;

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  closeSidebar() {
    this.sidebarOpen = false;
  }
}
