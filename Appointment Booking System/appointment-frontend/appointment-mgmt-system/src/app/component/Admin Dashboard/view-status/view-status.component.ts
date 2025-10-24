import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

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
export class ViewStatusComponent {
  viewStatusList: ViewStatus[] = [
    { doctorId: 'DOC001', currentStatus: 'Available', accountStatus: 'Active', upcomingLeave: '22 Oct 2025', appointmentsToday: 5 },
    { doctorId: 'DOC002', currentStatus: 'Busy', accountStatus: 'Active', upcomingLeave: 'N/A', appointmentsToday: 8 },
    { doctorId: 'DOC003', currentStatus: 'On Leave', accountStatus: 'Inactive', upcomingLeave: 'Till 25 Oct 2025', appointmentsToday: 0 }
  ];
}