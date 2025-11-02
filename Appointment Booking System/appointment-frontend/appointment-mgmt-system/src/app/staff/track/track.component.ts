import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisitFollowupService } from '../../service/visit-followup.service';

@Component({
  selector: 'app-appointment-tracker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class AppointmentTrackerComponent implements OnInit {
  followups: any[] = [];

  constructor(private followupService: VisitFollowupService) {}

  ngOnInit() {
    this.loadFollowups();
  }

  loadFollowups() {
    this.followupService.getAllFollowups().subscribe({
      next: data => (this.followups = data),
      error: err => console.error('Error fetching followups:', err)
    });
  }

  markPayment(appointmentId: string) {
    this.followupService.markPaymentCompleted(appointmentId).subscribe({
      next: () => {
        alert(`Payment marked for ${appointmentId}`);
        this.loadFollowups();
      },
      error: err => console.error('Error marking payment:', err)
    });
  }
}
