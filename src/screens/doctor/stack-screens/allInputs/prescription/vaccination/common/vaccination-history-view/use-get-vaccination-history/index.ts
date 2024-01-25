import {useApiServicesAppVaccineGetpatientvaccinationhistoryGetQuery} from '@/state/services/vaccineApi';

export const useGetVaccinationHistory = (patientId: number) => {
  const {
    data: patientHistorySummaries,
    refetch,
    isLoading: isLoadedVaccinations,
    isSuccess: loadedVaccinationsHistory,
  } = useApiServicesAppVaccineGetpatientvaccinationhistoryGetQuery({
    id: patientId,
  });

  const handleRefetchVaccinationHistory = async () => {
    await refetch().unwrap();
  };

  return {
    patientHistorySummaries,
    handleRefetchVaccinationHistory,
    isLoadedVaccinations,
    loadedVaccinationsHistory,
  };
};
