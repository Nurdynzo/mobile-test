import {PrescriptionState} from '@/screens/doctor/stack-screens/allInputs/prescription/types';

export type UseManageActivePillsProps = {
  prescription: PrescriptionState;
  setPrescription: (state: PrescriptionState) => void;
};
