import {UsePrescriptionFormValidationProps} from '@/screens/doctor/stack-screens/allInputs/prescription/prescribe-medication/use-prescription-form-validation/type';

export const usePrescriptionFormValidation = ({
  prescription,
}: UsePrescriptionFormValidationProps) => {
  return !(
    !prescription?.duration &&
    !prescription?.dosage &&
    !prescription?.frequency &&
    !prescription?.direction
  );
};
