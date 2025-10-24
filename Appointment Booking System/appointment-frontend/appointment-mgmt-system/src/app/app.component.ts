import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "./component/Admin Dashboard/sidebar/sidebar.component";
import { DoctorStaffSidebarComponent } from "./component/Doctor-Staff Dashboard/doctor-staff-sidebar/doctor-staff-sidebar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, DoctorStaffSidebarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {}
