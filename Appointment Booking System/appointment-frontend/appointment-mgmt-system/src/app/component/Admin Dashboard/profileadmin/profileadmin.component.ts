import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProfileadminService } from '../../../service/Admin Service/Admin-Profile Service/profileadmin.service';
import { Profileadmin } from '../../../model/Admin Model/Admin-Profile Model/profileadmin.model';

@Component({
  selector: 'app-profileadmin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profileadmin.component.html',
  styleUrls: ['./profileadmin.component.css']
})
export class ProfileadminComponent implements OnInit {
  adminId: string = '';
  password: string = '';
  originalAdminId: string = '';

  constructor(private profileService: ProfileadminService) {}

  ngOnInit(): void {
    const storedId = sessionStorage.getItem('adminId');
    if (storedId) {
      this.originalAdminId = storedId;
      this.fetchProfile(storedId);
    }
  }

  fetchProfile(adminId: string) {
    this.profileService.getProfile(adminId).subscribe({
      next: (data: Profileadmin) => {
        this.adminId = data.adminId;
        this.password = data.password;
      },
      error: () => alert('Failed to fetch profile')
    });
  }

  updateProfile() {
    const updatedProfile: Profileadmin = {
      adminId: this.adminId,
      password: this.password
    };
    this.profileService.updateProfile(this.originalAdminId, updatedProfile).subscribe({
      next: () => {
        alert('Profile updated successfully');
        sessionStorage.setItem('adminId', this.adminId);
        this.originalAdminId = this.adminId;
      },
      error: () => alert('Failed to update profile')
    });
  }
}
