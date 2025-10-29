export interface Appointment {
  id: number;
  patientName: string;  
  patientId: string;
  doctorId: string;
  dateTime: string;
  consultingFees: number;
  description: string;
  specialization: string;
  slot: string;
  consulted?: boolean;   // 👈 New: whether the patient is consulted
  followUpDate?: string; // 👈 New: optional follow-up date
}