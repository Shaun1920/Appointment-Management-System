import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/service/Admin Service/Admin-Login Service/admin.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule], // ✅ Make sure both are here
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  adminId: string = '';
  password: string = '';

  constructor(private adminService: AdminService, private router: Router) {}

  onLogin(form: NgForm) {
    if (!this.adminId || !this.password) {
      alert('Please enter both Admin ID and Password');
      return;
    }

    const admin = { adminId: this.adminId, password: this.password };

    this.adminService.login(admin).subscribe({
      next: (response) => {
        if (response.message === 'Login successful') {
          sessionStorage.setItem('adminLoggedIn', 'true');
          sessionStorage.setItem('adminId', response.adminId);
          alert('Login successful!');
          this.router.navigate(['/admin/doctors']);
        } else {
          alert('Invalid Admin ID or Password');
        }
      },
      error: () => {
        alert('Server error occurred');
      }
    });
  }
}
