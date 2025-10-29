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
// import { ProfileadminComponent } from './profileadmin/profileadmin.component';
import { ProfileadminComponent } from './component/Admin Dashboard/profileadmin/profileadmin.component';
import { AllocationComponent } from './component/Admin Dashboard/allocation/allocation.component';
import { DoctorDashboardComponent } from './Doctor-Staff_Dashboard/doctor/doctor-dashboard/doctor-dashboard.component';
import { DoctorLoginComponent } from './Doctor-Staff_Dashboard/doctor-login/doctor-login.component';
import { DoctorProfileComponent } from './Doctor-Staff_Dashboard/doctor-profile/doctor-profile.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AuthInterceptor } from './auth-interceptor';


@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,

    // Standalone components imported
     ProfileadminComponent,
    SidebarComponent,
    DoctorsComponent,
    StaffComponent,
    ViewStatusComponent,
    LoginComponent,
    DoctorStaffSidebarComponent,
    CalendarComponent,
    AllocationComponent,
   
    //doctor
    DoctorDashboardComponent,
    DoctorLoginComponent,
    DoctorProfileComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],

  // Do NOT declare AppComponent if it is standalone
  bootstrap: [],
  declarations: []  // Leave empty if AppComponent is standalone
})
export class AppModule {}
