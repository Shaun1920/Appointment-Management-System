import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Calendar } from '../../model/Doctor-Staff Calendar Model/calendar.model';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private events: Calendar[] = [
    { date: '2025-10-05', title: 'Doctor Appointment' },
    { date: '2025-10-12', title: 'Team Meeting' },
    { date: '2025-10-20', title: 'Project Deadline' }
  ];

  private eventsSubject = new BehaviorSubject<Calendar[]>(this.events);

  getEvents(): Observable<Calendar[]> {
    return this.eventsSubject.asObservable();
  }

  addEvent(event: Calendar) {
    this.events.push(event);
    this.eventsSubject.next(this.events);
  }

  getEventsByDate(date: string): Calendar[] {
    return this.events.filter(e => e.date === date);
  }

  deleteEvent(event: Calendar) {
    this.events = this.events.filter(e => e !== event);
    this.eventsSubject.next(this.events);
  }
}
