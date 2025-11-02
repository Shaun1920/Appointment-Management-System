import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusService } from 'src/app/service/Doctor Service/status.service';

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

  // ✅ Load all doctor statuses first
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
            appointmentsToday: 0 // initialize to 0
          };
        });

        // ✅ After mapping, fetch appointment count for each doctor
        this.viewStatusList.forEach(status => {
          this.statusService.getAppointmentCount(status.doctorId).subscribe({
            next: (count) => (status.appointmentsToday = count),
            error: (err) => console.error(`Failed to load appointments for ${status.doctorId}`, err)
          });
        });
      },
      error: (err) => {
        console.error('Failed to load doctor statuses', err);
        this.viewStatusList = [];
      }
    });
  }
}
