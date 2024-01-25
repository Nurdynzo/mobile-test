import {PrescriptionState} from '@/screens/doctor/stack-screens/allInputs/prescription/types';

export type UseHandlePrescriptionProps = {
  prescription: PrescriptionState;
  prescriptionState: PrescriptionState[];
  setPrescriptionState: (state: PrescriptionState[]) => void;
  setPrescription: (state: PrescriptionState) => void;
};
