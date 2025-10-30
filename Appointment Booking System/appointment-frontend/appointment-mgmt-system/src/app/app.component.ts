import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; // ✅ Add this
import { SidebarComponent } from "./component/Admin Dashboard/sidebar/sidebar.component";
// import { DoctorStaffSidebarComponent } from "./component/Doctor-Staff Dashboard/doctor-staff-sidebar/doctor-staff-sidebar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, // ✅ Add this so *ngIf works
    RouterOutlet,
    SidebarComponent
],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn(): boolean {
    return sessionStorage.getItem('adminLoggedIn') === 'true';
  }
}
