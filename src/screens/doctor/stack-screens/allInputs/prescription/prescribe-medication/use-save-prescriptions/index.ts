import {useCallback} from 'react';
import {showToast} from '@/components/app-toast';
import {getErrorMessage} from '@/utils/helpers';
import {PrescriptionState} from '@/screens/doctor/stack-screens/allInputs/prescription/types';
import {CreateMedicationDto} from '@/state/services/medicationApi';
import {prescriptionScreenInitialState} from '@/constants/prescription';
import {UseSavePrescriptionProps} from '@/screens/doctor/stack-screens/allInputs/prescription/prescribe-medication/use-save-prescriptions/type';

export const useSavePrescription = ({
  CreateMedications,
  prescriptionState,
  setPrescription,
  setPrescriptionState,
  patientId,
}: UseSavePrescriptionProps) => {
  const reformatState = (val: PrescriptionState[]) => {
    if (val.length > 0) {
      const value = val.map((item: PrescriptionState) => {
        return {
          patientId: patientId,
          productId: item.activePills[0]?.obj?.id || 0,
          productName:
            item.activePills[0]?.obj?.productName || item.activePills[0]?.value,
          productSource: item.activePills[0]?.obj?.source || 'manual',
          doseUnit: `${item.dosage?.value} ${item.dosage?.label}`,
          frequency: `${item.frequency?.value} ${item.frequency?.label}`,
          duration: `${item.duration?.value} ${item.duration?.label}`,
          direction: `${item.direction?.value}`,
          note: item.note,
        };
      });
      return value as CreateMedicationDto[];
    }
    return [] as CreateMedicationDto[];
  };

  const onSave = useCallback(async () => {
    try {
      await CreateMedications({
        createMultipleMedicationsDto: {
          prescriptions: reformatState(prescriptionState),
        },
      }).unwrap();
      showToast('SUCCESS', {
        title: 'Prescription saved successfully',
        message: 'Prescription have been saved for this encounter successfully',
      });
      setPrescription(prescriptionScreenInitialState);
      setPrescriptionState([]);
    } catch (error) {
      showToast('ERROR', {
        title: 'Error saving prescription',
        message: getErrorMessage(error),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    CreateMedications,
    prescriptionState,
    setPrescriptionState,
    setPrescription,
  ]);

  return onSave;
};
