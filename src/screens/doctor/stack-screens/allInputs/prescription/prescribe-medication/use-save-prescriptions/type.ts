import {ApiServicesAppMedicationCreatemedicationPostApiArg} from '@/state/services/medicationApi';
import {
  BaseQueryFn,
  MutationActionCreatorResult,
  MutationDefinition,
} from '@reduxjs/toolkit/dist/query/react';
import {PrescriptionState} from '@/screens/doctor/stack-screens/allInputs/prescription/types';

export type UseSavePrescriptionProps = {
  CreateMedications: (
    arg: ApiServicesAppMedicationCreatemedicationPostApiArg,
  ) => MutationActionCreatorResult<
    MutationDefinition<
      ApiServicesAppMedicationCreatemedicationPostApiArg,
      BaseQueryFn,
      'Medication' | 'Snowstorm',
      unknown,
      'api'
    >
  >;
  prescriptionState: PrescriptionState[];
  setPrescriptionState: (state: PrescriptionState[]) => void;
  setPrescription: (state: PrescriptionState) => void;
  patientId: number;
};
