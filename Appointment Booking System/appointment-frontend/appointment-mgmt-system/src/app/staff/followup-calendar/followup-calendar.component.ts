import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface Followup {
  patientId: string;
  followupDate: string; // from backend: "2025-11-04"
  notes?: string;
}

@Component({
  selector: 'app-followup-calendar',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './followup-calendar.component.html',
  styleUrls: ['./followup-calendar.component.css']
})
export class FollowupCalendarComponent implements OnInit {
  currentDate = new Date();
  currentMonth = this.currentDate.getMonth();
  currentYear = this.currentDate.getFullYear();

  daysInMonth: { day: number; date: string; followups: Followup[] }[] = [];
  followups: Followup[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadFollowups();
  }

  loadFollowups(): void {
    this.http.get<Followup[]>('http://localhost:8080/api/doctor/visitfollowup/all')
      .subscribe({
        next: (data) => {
          this.followups = data;
          this.generateCalendar(this.currentYear, this.currentMonth);
        },
        error: (err) => console.error('Error loading followups:', err)
      });
  }

  generateCalendar(year: number, month: number): void {
    this.daysInMonth = [];
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    // empty slots before 1st
    for (let i = 0; i < firstDay.getDay(); i++) {
      this.daysInMonth.push({ day: 0, date: '', followups: [] });
    }

    // fill days
    for (let d = 1; d <= lastDay.getDate(); d++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const followupForDay = this.followups.filter(f => f.followupDate === dateStr);
      this.daysInMonth.push({ day: d, date: dateStr, followups: followupForDay });
    }
  }

  prevMonth(): void {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.generateCalendar(this.currentYear, this.currentMonth);
  }

  nextMonth(): void {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.generateCalendar(this.currentYear, this.currentMonth);
  }

  isToday(dateStr: string): boolean {
    const today = new Date();
    return dateStr === today.toISOString().split('T')[0];
  }
}
