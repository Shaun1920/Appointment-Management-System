import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components
import { SidebarComponent } from './component/Admin Dashboard/sidebar/sidebar.component';
import { DoctorsComponent } from './component/Admin Dashboard/doctors/doctors.component';
import { StaffComponent } from './component/Admin Dashboard/staff/staff.component';
import { ViewStatusComponent } from './component/Admin Dashboard/view-status/view-status.component';
import { LoginComponent } from './component/Admin Dashboard/login/login.component';

// Routing
import { AppRoutingModule } from './app-routing.module';
import { DoctorStaffSidebarComponent } from './component/Doctor-Staff Dashboard/doctor-staff-sidebar/doctor-staff-sidebar.component';
import { CalendarComponent } from './component/Doctor-Staff Dashboard/calendar/calendar.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,

    // Standalone components imported
    SidebarComponent,
    DoctorsComponent,
    StaffComponent,
    ViewStatusComponent,
    LoginComponent,
    DoctorStaffSidebarComponent,
    CalendarComponent
  ],
  providers: [],
  // Do NOT declare AppComponent if it is standalone
  bootstrap: [],
  declarations: [
  ]  // Leave empty if AppComponent is standalone
})
export class AppModule {}
