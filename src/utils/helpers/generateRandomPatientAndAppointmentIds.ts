export function generateRandomPatientAndAppointmentIds(): {
  patientId: number;
  appointmentId: number;
} {
  const patientId = Math.floor(Math.random() * (1999 - 1990 + 1) + 1990);
  const appointmentId = Math.floor(Math.random() * (2033 - 2000 + 1) + 2000);
  return {patientId, appointmentId};
}
