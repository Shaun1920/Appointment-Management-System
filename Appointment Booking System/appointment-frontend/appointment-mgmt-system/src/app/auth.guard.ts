import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isLoggedIn = sessionStorage.getItem('adminLoggedIn') === 'true'; // ✅ same key as login

  if (!isLoggedIn) {
    router.navigate(['/Access-Point/Appointment-Booking-System/auth-admin/login']);
    return false;
  }

  return true;
};
