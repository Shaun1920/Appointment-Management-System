export interface Appointment {
  id: number;
  appointmentId: string;
  patientName: string;
  patientId: string;
  doctorId: string;
  dateTime: string;
  time?: string;
  consultingFees: number;
  description: string;
  specialization: string;
  slot: string;
  type?: string;

  // New fields for tracking visit and follow-up
  visited?: boolean;
  showCalendar?: boolean;
  followupDate?: string;
}
