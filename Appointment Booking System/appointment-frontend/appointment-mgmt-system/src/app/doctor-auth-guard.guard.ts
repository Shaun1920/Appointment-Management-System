// // src/app/doctor-auth-guard.guard.ts
// import { inject } from '@angular/core';
// import { CanActivateFn, Router } from '@angular/router';
// import { DoctorAuthService } from './service/Doctor Service/doctor-auth-service.service';

// export const doctorAuthGuard: CanActivateFn = (route, state) => {
//   const auth = inject(DoctorAuthService);
//   const router = inject(Router);

//   if (auth.isLoggedIn()) {
//     return true;
//   } else {
//     router.navigate(['/doctor-login']);
//     return false;
//   }
// };

// src/app/doctor-auth-guard.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { DoctorAuthService } from './service/Doctor Service/doctor-auth-service.service';

export const doctorAuthGuard: CanActivateFn = () => {
  const auth = inject(DoctorAuthService);
  const router = inject(Router);

  if (auth.isLoggedIn() && auth.hasRole('doctor')) return true;

  router.navigate(['/doctor-login']);
  return false;
};