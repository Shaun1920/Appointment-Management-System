// src/app/staff-auth-guard.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { DoctorAuthService } from './service/Doctor Service/doctor-auth-service.service';

export const staffAuthGuard: CanActivateFn = () => {
  const auth = inject(DoctorAuthService);
  const router = inject(Router);

  if (auth.isLoggedIn() && auth.hasRole('staff')) return true;

  router.navigate(['/doctor-login']); // or '/staff-login' if you have one
  return false;
};