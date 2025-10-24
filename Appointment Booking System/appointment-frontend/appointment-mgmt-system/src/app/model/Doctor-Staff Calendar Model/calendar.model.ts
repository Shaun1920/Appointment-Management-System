export interface Calendar {
  date: string;           // ISO format: 'YYYY-MM-DD'
  title: string;          // Event/appointment name
  doctorId?: string;      // Optional: for filtering per doctor
  patientName?: string;   // Optional
}
