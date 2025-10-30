// src/app/interceptors/auth.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { DoctorAuthService } from '../services/doctor-auth.service';
import { DoctorAuthService } from './service/Doctor Service/doctor-auth-service.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: DoctorAuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.auth.token;
    if (token) {
      const authReq = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
      return next.handle(authReq);
    }
    return next.handle(req);
  }
}