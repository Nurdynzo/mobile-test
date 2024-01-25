import {useCallback} from 'react';
import {prescriptionScreenInitialState} from '@/constants/prescription';
import {UseHandlePrescriptionProps} from '@/screens/doctor/stack-screens/allInputs/prescription/prescribe-medication/use-handle-add-prescription/type';

export const useHandleAddPrescription = ({
  prescription,
  setPrescriptionState,
  prescriptionState,
  setPrescription,
}: UseHandlePrescriptionProps) => {
  const handleAddPrescription = useCallback(() => {
    const newStates = [...prescriptionState];
    newStates.push(prescription);
    setPrescriptionState(newStates);
    setPrescription(prescriptionScreenInitialState);
  }, [prescription, prescriptionState, setPrescription, setPrescriptionState]);

  return handleAddPrescription;
};
