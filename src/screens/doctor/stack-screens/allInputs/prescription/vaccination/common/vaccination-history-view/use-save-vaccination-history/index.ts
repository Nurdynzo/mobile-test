import {showToast} from '@/components/app-toast';
import {CreateVaccinationHistoryDto} from '@/state/services/patientApi';
import {useApiServicesAppVaccineCreatevaccinationhistoryPostMutation} from '@/state/services/vaccineApi';
import VoidFunction from '@/types/voidfunction';
import {historyDoseType} from '../../../../types';

export const useSaveVaccinationHistory = () => {
  const [
    recordVaccinationHistoryRequest,
    {isLoading, isSuccess: savedVaccination},
  ] = useApiServicesAppVaccineCreatevaccinationhistoryPostMutation();

  const handleCreateVaccinationHistory = async ({
    cleanup,
    historyDoseForm,
    id,
    patientId,
  }: {
    historyDoseForm: historyDoseType;
    id: number;
    patientId: number;
    cleanup: VoidFunction;
  }) => {
    try {
      const {hasComplication, interval, note, howLong} = historyDoseForm;
      const payload: CreateVaccinationHistoryDto = {
        hasComplication,
        note,
        vaccineId: id,
        id: patientId,
        lastVaccineDuration: `${howLong} ${interval}`,
      };
      await recordVaccinationHistoryRequest({
        createMultipleVaccinationHistoryDto: {
          vaccinationHistory: [payload],
        },
      }).unwrap();

      showToast('SUCCESS', {
        title: 'Success',
        message: 'Added Vaccination history!',
      });
      cleanup();
    } catch (error) {
      showToast('ERROR', {
        title: 'Failed',
        message: 'Failed to add vaccination history',
      });
    }
  };
  return {isLoading, handleCreateVaccinationHistory, savedVaccination};
};
