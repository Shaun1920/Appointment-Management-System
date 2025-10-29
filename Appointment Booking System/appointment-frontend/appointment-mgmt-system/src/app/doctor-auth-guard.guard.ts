// import { CanActivateFn, Router } from '@angular/router';
// import { inject } from '@angular/core';

// export const doctorAuthGuard: CanActivateFn = () => {
//   const router = inject(Router);
//   const doctorId = localStorage.getItem('doctorId');

//   if (doctorId) {
//     return true;
//   } else {
//     router.navigate(['/doctor-login']);
//     return false;
//   }
// };

// src/app/doctor-auth-guard.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
// import { DoctorAuthService } from './services/doctor-auth.service';
import { DoctorAuthService } from './service/doctor-auth-service.service';

export const doctorAuthGuard: CanActivateFn = (route, state) => {
  const auth = inject(DoctorAuthService);
  const router = inject(Router);

  if (auth.isLoggedIn()) {
    return true;
  } else {
    router.navigate(['/doctor-login']);
    return false;
  }
};
