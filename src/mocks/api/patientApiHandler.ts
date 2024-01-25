import {ApiServicesAppPatientsCreateoreditPostApiResponse} from '@/state/services/patientApi';
import {HttpResponse, http} from 'msw';

const createEditPatient = http.post(
  `${process.env.API_BASE_URL}/api/services/app/Patients/CreateOrEdit`,
  () => {
    return HttpResponse.json({
      result: patientDetails,
      targetUrl: null,
      success: true,
      error: null,
      unAuthorizedRequest: false,
      __abp: true,
    });
  },
);

const getPatientForEdit = http.get(
  `${process.env.API_BASE_URL}/api/services/app/Patients/GetPatientForEdit`,
  () => {
    return HttpResponse.json({
      result: patientDetails,
      targetUrl: null,
      success: true,
      error: null,
      unAuthorizedRequest: false,
      __abp: true,
    });
  },
);

export const patientApiHandler = [createEditPatient, getPatientForEdit];

const patientDetails = {
  genderType: 'Male',
  firstName: 'John',
  lastName: 'Doe',
  phoneNumber: '555-1234',
  dateOfBirth: '1980-04-23',
  title: 'Mr',
  middleName: 'Alexander',
  emailAddress: 'john.doe@example.com',
  address: '123 Maple Street, Hometown, HT',
  isNewToHospital: true,
  stateOfOriginId: 1,
  countryId: 1,
  districtId: 1,
  userId: 42,
  patientCode: 'P123456',
} as ApiServicesAppPatientsCreateoreditPostApiResponse;
