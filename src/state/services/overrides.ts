import {
  ApiServicesAppPatientappointmentsReassignepatientappointmentPostApiArg,
  ApiServicesAppPatientappointmentsReassignepatientappointmentPostApiResponse,
  patientApi,
} from '../services/patientApi';

patientApi.injectEndpoints({
  endpoints: build => ({
    apiServicesAppPatientappointmentsReassignepatientappointmentPost:
      build.mutation<
        ApiServicesAppPatientappointmentsReassignepatientappointmentPostApiResponse,
        ApiServicesAppPatientappointmentsReassignepatientappointmentPostApiArg
      >({
        query: queryArg => ({
          url: `/api/services/app/PatientAppointments/ReassignePatientAppointment`,
          method: 'POST',
          body: queryArg.reassignPatientAppointmentDto,
        }),
        invalidatesTags: ['PatientAppointments', 'Patients'],
      }),
  }),
  overrideExisting: true,
});

export const {
  useApiServicesAppPatientappointmentsReassignepatientappointmentPostMutation,
} = patientApi;
