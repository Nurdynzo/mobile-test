import {
  ApiServicesAppVaccineCreatevaccinationPostApiResponse,
  ApiServicesAppVaccineCreatevaccinationhistoryPostApiResponse,
  ApiServicesAppVaccineGetpatientvaccinationhistoryGetApiResponse,
} from '@/state/services/vaccineApi';
import {http, HttpResponse} from 'msw';

const createPatientVaccinationHistory = http.post(
  `${process.env.API_BASE_URL}/api/services/app/Vaccine/CreateVaccinationHistory`,
  () => {
    return HttpResponse.json({
      result:
        {} as ApiServicesAppVaccineCreatevaccinationhistoryPostApiResponse,
      targetUrl: null,
      success: true,
      error: null,
      unAuthorizedRequest: false,
      __abp: true,
    });
  },
);
const savePatientRecordedVaccinationHistory = http.post(
  `${process.env.API_BASE_URL}/api/services/app/Vaccine/CreateVaccination`,
  () => {
    return HttpResponse.json({
      result: {} as ApiServicesAppVaccineCreatevaccinationPostApiResponse,
      targetUrl: null,
      success: true,
      error: null,
      unAuthorizedRequest: false,
      __abp: true,
    });
  },
);

const getPatientVaccinationHistory = http.get(
  `${process.env.API_BASE_URL}/api/services/app/Vaccine/GetPatientVaccinationHistory`,
  () => {
    return HttpResponse.json({
      result:
        results as ApiServicesAppVaccineGetpatientvaccinationhistoryGetApiResponse,
      targetUrl: null,
      success: true,
      error: null,
      unAuthorizedRequest: false,
      __abp: true,
    });
  },
);

export const vaccinationApiHandler = [
  createPatientVaccinationHistory,
  getPatientVaccinationHistory,
  savePatientRecordedVaccinationHistory,
];

const results = [
  {
    id: 320,
    patientId: 1993,
    vaccineId: 2,
    vaccine: {
      id: 2,
      name: 'Meningococcal Conjugate',
      fullName: null,
      schedules: [
        {
          id: 3,
          dosage: null,
          doses: 1,
          routeOfAdministration: null,
          ageMin: 6,
          ageMinUnit: 'Year',
          ageMax: null,
          ageMaxUnit: null,
          notes: null,
        },
        {
          id: 2,
          dosage: null,
          doses: 3,
          routeOfAdministration: null,
          ageMin: 1,
          ageMinUnit: 'Month',
          ageMax: 5,
          ageMaxUnit: 'Year',
          notes: '8 weeks interval between 1st and 2nd doses.',
        },
      ],
    },
    hasComplication: true,
    lastVaccineDuration: '3 Months',
    note: "He's recovering quickly now!",
  },
];
