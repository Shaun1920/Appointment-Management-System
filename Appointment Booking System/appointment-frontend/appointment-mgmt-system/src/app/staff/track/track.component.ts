import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

type Stage = 'CREATED' | 'VISITED' | 'PAID' | 'DONE';

interface TrackerItem {
  id: number;
  patientId: string;
  patientName: string;
  doctorName: string;
  stage: Stage;
}

@Component({
  selector: 'app-appointment-tracker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class AppointmentTrackerComponent {
  readonly stages: Stage[] = ['CREATED', 'VISITED', 'PAID', 'DONE'];

  items: TrackerItem[] = [
    { id: 101, patientId: 'P-0001', patientName: 'Aarav Shah', doctorName: 'Dr. Mehta',  stage: 'VISITED' },
    { id: 102, patientId: 'P-0002', patientName: 'Isha Rao',   doctorName: 'Dr. Kapoor', stage: 'CREATED' },
    { id: 103, patientId: 'P-0003', patientName: 'Rohan Jain', doctorName: 'Dr. Mehta',  stage: 'PAID' },
    { id: 104, patientId: 'P-0004', patientName: 'Neha Patel', doctorName: 'Dr. Bose',   stage: 'DONE' },
  ];

  private idx(s: Stage) { return this.stages.indexOf(s); }
  isActive(current: Stage, probe: Stage) { return this.idx(probe) <= this.idx(current); }

  nextStage(it: TrackerItem) {
    const i = this.idx(it.stage);
    if (i < this.stages.length - 1) it.stage = this.stages[i + 1];
  }
  setStage(it: TrackerItem, s: Stage) { it.stage = s; }

  progress(it: TrackerItem) {
    const i = this.idx(it.stage);
    return (i / (this.stages.length - 1)) * 100; // 0..100
  }
}


// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';
// import { StaffTrackerService } from '../../service/staff-tracker.service';

// type Stage = 'CREATED' | 'VISITED' | 'PAID' | 'DONE';

// export interface TrackerItem {
//   id: number;
//   patientId: string;
//   patientName: string;
//   doctorName: string;
//   stage: Stage;
// }

// @Component({
//   selector: 'app-appointment-tracker',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './tracker.component.html',
//   styleUrls: ['./tracker.component.css']
// })
// export class AppointmentTrackerComponent implements OnInit {
//   readonly stages: Stage[] = ['CREATED', 'VISITED', 'PAID', 'DONE'];
//   items$!: Observable<TrackerItem[]>;     // <-- stream from backend
//   loading = true;
//   error = '';

//   constructor(private api: StaffTrackerService) {}

//   ngOnInit(): void {
//     this.items$ = this.api.getTodayAppointments().pipe(
//       map(list => {
//         this.loading = false;
//         return list;
//       })
//     );
//     this.api.errors$.subscribe(e => { if (e) { this.loading = false; this.error = e; } });
//   }

//   private idx(s: Stage) { return this.stages.indexOf(s); }
//   isActive(current: Stage, probe: Stage) { return this.idx(probe) <= this.idx(current); }
//   progress(it: TrackerItem) { return (this.idx(it.stage) / (this.stages.length - 1)) * 100; }
// }
