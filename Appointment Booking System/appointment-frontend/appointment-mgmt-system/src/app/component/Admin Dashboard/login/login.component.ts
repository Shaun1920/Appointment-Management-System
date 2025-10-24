import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/service/Admin-Login Service/admin.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  adminId = '';
  password = '';

  constructor(private adminService: AdminService, private router: Router) {}

  onLogin(form: NgForm) {
    if (!this.adminId || !this.password) {
      alert('Please enter both Admin ID and Password');
      return;
    }

    const admin = { adminId: this.adminId, password: this.password };
    this.adminService.login(admin).subscribe({
      next: () => {
        alert('Login successful!');
        this.router.navigate(['/doctors']);
      },
      error: () => {
        alert('Invalid Admin ID or Password');
      }
    });
  }
}
