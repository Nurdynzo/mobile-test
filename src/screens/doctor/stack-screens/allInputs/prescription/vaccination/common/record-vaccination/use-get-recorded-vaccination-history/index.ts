import {useApiServicesAppVaccineGetpatientvaccinationhistoryGetQuery} from '@/state/services/vaccineApi';

//TODO(Zucci): This is a place holder, until the actual endpoint comes.
export const useGetRecordedVaccinationHistory = (patientId: number) => {
  const {
    data: apiVaccinationHistory,
    refetch: handleRefetchRecordedVaccination,
    isLoading: isLoadedRecordedVaccinations,
    isSuccess: loadedRecordedVaccinations,
  } = useApiServicesAppVaccineGetpatientvaccinationhistoryGetQuery({
    id: patientId,
  });

  return {
    apiVaccinationHistory,
    handleRefetchRecordedVaccination,
    isLoadedRecordedVaccinations,
    loadedRecordedVaccinations,
  };
};
