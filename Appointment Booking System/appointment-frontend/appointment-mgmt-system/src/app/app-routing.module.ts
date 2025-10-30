// // 
// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';

// // Components
// import { LoginComponent } from './component/Admin Dashboard/login/login.component';
// import { DoctorsComponent } from './component/Admin Dashboard/doctors/doctors.component';
// import { StaffComponent } from './component/Admin Dashboard/staff/staff.component';
// import { ViewStatusComponent } from './component/Admin Dashboard/view-status/view-status.component';
// import { CalendarComponent } from './component/Doctor-Staff Dashboard/calendar/calendar.component';
// // import { authGuard } from './guard/auth.guard';
// import { authGuard } from './auth.guard';
// import { ProfileadminComponent } from './component/Admin Dashboard/profileadmin/profileadmin.component';
// import { AllocationComponent } from './component/Admin Dashboard/allocation/allocation.component';
// import { DoctorDashboardComponent } from './Doctor-Staff_Dashboard/doctor/doctor-dashboard/doctor-dashboard.component';
// import { doctorAuthGuard } from './doctor-auth-guard.guard';
// import { DoctorLoginComponent } from './Doctor-Staff_Dashboard/doctor-login/doctor-login.component';

// const routes: Routes = [
//   //{ path: '', redirectTo: 'Access-Point/Appointment-Booking-System/auth-admin/login', pathMatch: 'full' },
//   { path: 'Access-Point/Appointment-Booking-System/auth-admin/login', component: LoginComponent },

//   {
//     path: 'admin',
//     canActivate: [authGuard],
//     children: [
//       { path: 'doctors', component: DoctorsComponent },
//       { path: 'staff', component: StaffComponent },
//       { path: 'view-status', component: ViewStatusComponent },
//        { path: 'profile', component: ProfileadminComponent, canActivate: [authGuard] },
//        { path: 'allocation', component: AllocationComponent }

//     ]
//   },

//   // { path: '', redirectTo: 'doctor-login', pathMatch: 'full' },
//   { path: 'doctor-login', component: DoctorLoginComponent },
//   { path: 'doctor-dashboard', component: DoctorDashboardComponent, canActivate:[doctorAuthGuard] },
//   // { path: 'doctor-profile', component: DoctorProfileComponent, canActivate:[AuthGuard] },

//   { path: 'calendar', component: CalendarComponent },
//   // { path: '**', redirectTo: 'login' }
// ];


// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule {}


import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Admin components
import { LoginComponent } from './component/Admin Dashboard/login/login.component';
import { DoctorsComponent } from './component/Admin Dashboard/doctors/doctors.component';
import { StaffComponent } from './component/Admin Dashboard/staff/staff.component';
import { ViewStatusComponent } from './component/Admin Dashboard/view-status/view-status.component';
import { ProfileadminComponent } from './component/Admin Dashboard/profileadmin/profileadmin.component';
import { AllocationComponent } from './component/Admin Dashboard/allocation/allocation.component';

// Doctor components
// import { DoctorDashboardComponent } from './component/Doctor-Staff Dashboard/doctor/doctor-dashboard/doctor-dashboard.component';
import { DoctorDashboardComponent } from './Doctor-Staff_Dashboard/doctor/doctor-dashboard/doctor-dashboard.component';
import { CalendarComponent } from './Doctor-Staff_Dashboard/calendar/calendar.component';
// import { DoctorLoginComponent } from './component/Doctor-Staff Dashboard/doctor/doctor-login/doctor-login.component';
import { DoctorLoginComponent } from './Doctor-Staff_Dashboard/doctor/doctor-login/doctor-login.component';

// Guards
// import { AdminAuthGuard } from './guard/admin-auth.guard';
import { authGuard } from './auth.guard';
// import { DoctorAuthGuard } from './guard/doctor-auth.guard';
import { doctorAuthGuard } from './doctor-auth-guard.guard';
import { DoctorProfileComponent } from './Doctor-Staff_Dashboard/doctor/doctor-profile/doctor-profile.component';
// import { StaffDashboardComponent } from './staff-dashboard/staff-dashboard.component';
import { StaffDashboardComponent } from './staff/staff-dashboard/staff-dashboard.component';
import { staffAuthGuard } from './staff-auth-guard.guard';

const routes: Routes = [
  { path: '', redirectTo: 'Access-Point/Appointment-Booking-System/auth-admin/login', pathMatch: 'full' },

  // --- Admin routes ---
  { path: 'Access-Point/Appointment-Booking-System/auth-admin/login', component: LoginComponent },
  {
    path: 'admin',
    canActivate: [authGuard],
    children: [
      { path: 'doctors', component: DoctorsComponent },
      { path: 'staff', component: StaffComponent },
      { path: 'view-status', component: ViewStatusComponent },
      { path: 'profile', component: ProfileadminComponent },
      { path: 'allocation', component: AllocationComponent },
    ]
  },

  // // --- Doctor routes ---
  // { path: 'doctor-login', component: DoctorLoginComponent },
  // { path: 'doctor-dashboard', component: DoctorDashboardComponent, canActivate: [doctorAuthGuard] },
  // { path: 'doctor-profile', component: DoctorProfileComponent, canActivate: [doctorAuthGuard] },
  // { path: 'calendar', component: CalendarComponent, canActivate: [doctorAuthGuard] },

  // // --- Staff routes ---
  // {path: 'staff-dashboard', component: StaffDashboardComponent, canActivate: [staffAuthGuard]},

  // { path: 'doctor-dashboard', canActivate: [doctorAuthGuard], loadComponent: () => import('./Doctor-Staff_Dashboard/doctor/doctor-dashboard/doctor-dashboard.component').then(m => m.DoctorDashboardComponent) },
  // // { path: 'doctor-profile', canActivate: [doctorAuthGuard], loadComponent: () => import('./Doctor-Staff_Dashboard/doctor/doctor-profile/doctor-profile.component').then(m => m.DoctorProfileComponent) },
  // { path: 'staff-dashboard',  canActivate: [staffAuthGuard],  loadComponent: () => import('./staff-dashboard/staff-dashboard.component').then(m => m.StaffDashboardComponent) },
  // { path: 'doctor-login', loadComponent: () => import('./Doctor-Staff_Dashboard/doctor/doctor-login/doctor-login.component').then(m => m.DoctorLoginComponent) },


  {
    path: 'doctor-login',
    loadComponent: () =>
      import('./Doctor-Staff_Dashboard/doctor/doctor-login/doctor-login.component').then(
        (m) => m.DoctorLoginComponent
      ),
  },

  // Doctor Dashboard + children
  {
    path: 'doctor-dashboard',
    canActivate: [doctorAuthGuard],
    loadComponent: () =>
      import('./Doctor-Staff_Dashboard/doctor/doctor-dashboard/doctor-dashboard.component').then(
        (m) => m.DoctorDashboardComponent
      ),
    children: [
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full',
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./Doctor-Staff_Dashboard/doctor/doctor-profile/doctor-profile.component').then(
            (m) => m.DoctorProfileComponent
          ),
      },
    ],
  },

  {
    path: 'staff-dashboard',
    canActivate: [staffAuthGuard],
    loadComponent: () =>
      import('./staff/staff-dashboard/staff-dashboard.component').then(
        (m) => m.StaffDashboardComponent
      ),
    children: [
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full',
      },
{
  path: 'staff-profile',
  loadComponent: () =>
    import('./staff/staff-profile/staff-profile.component')
      .then(m => m.StaffProfileComponent)
},
    {
        path: 'patient-registration',
        loadComponent: () =>
          import('./staff/patient-registration/patient-registration.component').then(m => m.PatientRegistrationComponent)
      },
      // {
      //   path: 'appointments',
      //   loadComponent: () =>
      //     import('./Doctor-Staff_Dashboard/staff-appointments/staff-appointments.component').then(
      //       (m) => m.StaffAppointmentsComponent
      //     ),
      // },
    ],
  },

 
  // --- Fallback ---
  { path: '**', redirectTo: 'Access-Point/Appointment-Booking-System/auth-admin/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}