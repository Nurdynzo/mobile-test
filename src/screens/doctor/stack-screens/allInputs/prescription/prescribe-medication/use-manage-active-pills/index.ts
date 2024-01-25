import {useCallback} from 'react';
import {SearchMedicationForReturnDto} from '@/state/services/medicationApi';
import {UseManageActivePillsProps} from '@/screens/doctor/stack-screens/allInputs/prescription/prescribe-medication/use-manage-active-pills/type';

export const useManageActivePills = ({
  prescription,
  setPrescription,
}: UseManageActivePillsProps) => {
  const addItemToActivePills = useCallback(
    (item: SearchMedicationForReturnDto) => {
      if (!prescription?.activePills.find(p => p.value === item)) {
        const newActivePills = [...prescription.activePills];
        newActivePills.push({
          value: `${item?.productName}, ${item?.doseForm}`,
          type: 'Prescription',
          obj: item || ({} as SearchMedicationForReturnDto),
        });
        setPrescription({...prescription, activePills: newActivePills});
      }
    },
    [prescription, setPrescription],
  );

  return addItemToActivePills;
};
