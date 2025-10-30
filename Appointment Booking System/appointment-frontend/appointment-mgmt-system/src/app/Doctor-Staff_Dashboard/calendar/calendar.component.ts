import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common'; // ✅ Important for *ngIf, *ngFor, and date pipe

interface Appointment {
  date: string;
  title: string;
}

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, DatePipe], // ✅ Fixes all template warnings
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  currentDate = new Date();
  daysInMonth: Date[] = [];

  appointments: Appointment[] = [
    { date: '2025-10-05', title: 'Doctor Appointment' },
    { date: '2025-10-12', title: 'Team Meeting' },
    { date: '2025-10-20', title: 'Project Deadline' }
  ];

  ngOnInit() {
    this.generateCalendar();
  }

  generateCalendar() {
    this.daysInMonth = [];
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDay = firstDay.getDay();

    // Empty slots before first day
    for (let i = 0; i < startDay; i++) {
      this.daysInMonth.push(new Date(NaN)); // placeholder for empty cells
    }

    // Days in current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      this.daysInMonth.push(new Date(year, month, i));
    }
  }

  getAppointments(date: Date): Appointment[] {
    const dateStr = date.toISOString().split('T')[0];
    return this.appointments.filter(app => app.date === dateStr);
  }

  nextMonth() {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
    this.generateCalendar();
  }

  prevMonth() {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
    this.generateCalendar();
  }

  // ✅ Fix for "isNaN does not exist"
  isInvalidDate(date: Date): boolean {
    return isNaN(date.getTime());
  }
}