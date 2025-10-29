import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusService } from 'src/app/service/status.service'; // ✅ make sure this exists or update the path

interface ViewStatus {
  doctorId: string;
  currentStatus: string;
  accountStatus: string;
  upcomingLeave: string;
  appointmentsToday: number;
}

@Component({
  selector: 'app-view-status',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-status.component.html',
  styleUrls: ['./view-status.component.css']
})
export class ViewStatusComponent implements OnInit {
  viewStatusList: ViewStatus[] = [];

  constructor(private statusService: StatusService) {}

  ngOnInit(): void {
    this.loadStatuses();
  }

  loadStatuses(): void {
    this.statusService.getAllStatuses().subscribe({
      next: (list: any[]) => {
        this.viewStatusList = (list || []).map(ds => {
          const inactive = (ds.accountStatus || '').toLowerCase() === 'inactive';
          return {
            doctorId: ds.doctorCode || ds.doctorId || '--',
            currentStatus: inactive ? '--' : (ds.currentStatus || 'Available'),
            accountStatus: ds.accountStatus || 'Inactive',
            upcomingLeave: ds.upcomingLeave || 'N/A',
            appointmentsToday: ds.appointmentsToday ?? 0
          };
        });
      },
      error: (err) => {
        console.error('Failed to load doctor statuses', err);
        this.viewStatusList = [];
      }
    });
  }
}