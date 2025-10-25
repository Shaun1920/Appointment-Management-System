// 
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { LoginComponent } from './component/Admin Dashboard/login/login.component';
import { DoctorsComponent } from './component/Admin Dashboard/doctors/doctors.component';
import { StaffComponent } from './component/Admin Dashboard/staff/staff.component';
import { ViewStatusComponent } from './component/Admin Dashboard/view-status/view-status.component';
import { CalendarComponent } from './component/Doctor-Staff Dashboard/calendar/calendar.component';
// import { authGuard } from './guard/auth.guard';
import { authGuard } from './auth.guard';
import { ProfileadminComponent } from './component/Admin Dashboard/profileadmin/profileadmin.component';

const routes: Routes = [
  { path: '', redirectTo: 'Access-Point/Appointment-Booking-System/auth-admin/login', pathMatch: 'full' },
  { path: 'Access-Point/Appointment-Booking-System/auth-admin/login', component: LoginComponent },

  {
    path: 'admin',
    canActivate: [authGuard],
    children: [
      { path: 'doctors', component: DoctorsComponent },
      { path: 'staff', component: StaffComponent },
      { path: 'view-status', component: ViewStatusComponent },
       { path: 'profile', component: ProfileadminComponent, canActivate: [authGuard] },
    ]
  },

  { path: 'calendar', component: CalendarComponent },
  { path: '**', redirectTo: 'login' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
