import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone:true,
  imports:[FormsModule,CommonModule],
  selector: 'app-doctor-status',
  templateUrl: './doctor-status.component.html',
  styleUrls: ['./doctor-status.component.css']
})
export class DoctorStatusComponent implements OnInit {
  doctorStatusList: any[] = [];
  groupedDoctorStatus: any[] = [];
  loading = false;
  error: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchDoctorStatus();
  }

  fetchDoctorStatus() {
    this.loading = true;
    this.http.get<any[]>('http://localhost:8080/api/appointments/status').subscribe({
      next: (data) => {
        this.doctorStatusList = data;
        this.groupDoctorsBySlots();
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to load doctor status.';
        this.loading = false;
      }
    });
  }

  groupDoctorsBySlots() {
    const grouped: { [key: string]: any } = {};

    this.doctorStatusList.forEach(item => {
      const key = item.doctorId;

      if (!grouped[key]) {
        grouped[key] = {
          doctorName: item.doctorName,
          doctorId: item.doctorId,
          slot1: '-',
          slot2: '-',
          slot3: '-',
          slot4: '-',
          slot5: '-'
        };
      }

      // Example slot values are "slot1", "slot2", etc.
      grouped[key][item.slot] = item.count + '/2';
    });

    this.groupedDoctorStatus = Object.values(grouped);
  }
}
