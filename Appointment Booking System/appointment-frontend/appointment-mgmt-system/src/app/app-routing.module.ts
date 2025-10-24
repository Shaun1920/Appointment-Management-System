import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { LoginComponent } from './component/Admin Dashboard/login/login.component';
import { DoctorsComponent } from './component/Admin Dashboard/doctors/doctors.component';
import { StaffComponent } from './component/Admin Dashboard/staff/staff.component';
import { ViewStatusComponent } from './component/Admin Dashboard/view-status/view-status.component';
import { CalendarComponent } from './component/Doctor-Staff Dashboard/calendar/calendar.component';

const routes: Routes = [
  { path: '', component: LoginComponent },      // login as default
  { path: 'doctors', component: DoctorsComponent },
  { path: 'staff', component: StaffComponent },
  { path: 'view-status', component: ViewStatusComponent },
  { path: 'calendar', component: CalendarComponent }, // ✅ calendar route
  { path: '**', redirectTo: '' }                // fallback to login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
