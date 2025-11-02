import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface Followup {
  appointmentId: string;
  followupDate: string;
  patientId: string;
  notes: string;
}

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  currentDate = new Date();
  daysInMonth: Date[] = [];
  followups: Followup[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.generateCalendar();
    this.loadFollowups();
  }

  // ✅ Fetch from backend and fix timezone shift issue
  loadFollowups() {
    this.http.get<Followup[]>('http://localhost:8080/api/doctor/followups').subscribe({
      next: (data) => {
        this.followups = data.map(f => {
          const localDate = new Date(f.followupDate);
          // ✅ Adjust date to match backend correctly
          localDate.setMinutes(localDate.getMinutes() + localDate.getTimezoneOffset());
          return { ...f, followupDate: localDate.toISOString().split('T')[0] };
        });
      },
      error: (err) => console.error('Error loading followups:', err)
    });
  }

  generateCalendar() {
    this.daysInMonth = [];
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDay = firstDay.getDay();

    // Empty slots for days before the 1st of month
    for (let i = 0; i < startDay; i++) {
      this.daysInMonth.push(new Date(NaN));
    }

    // Days in the current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      this.daysInMonth.push(new Date(year, month, i));
    }
  }

  getFollowupsForDay(date: Date): Followup[] {
    const dateStr = date.toISOString().split('T')[0];
    return this.followups.filter(f => f.followupDate === dateStr);
  }

  nextMonth() {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
    this.generateCalendar();
  }

  prevMonth() {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
    this.generateCalendar();
  }

  isInvalidDate(date: Date): boolean {
    return isNaN(date.getTime());
  }
}
