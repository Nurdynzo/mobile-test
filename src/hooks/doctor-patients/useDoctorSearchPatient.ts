import {useApiServicesAppPatientsGetoutpatientlandinglistGetQuery} from '@/state/services/patientApi';

export const useDoctorSearchPatient = ({searchText}: {searchText?: string}) => {
  const {
    isError,
    isFetching: searchingForPatient,
    isSuccess,
    currentData: searchResult,
    refetch: searchForPatient,
  } = useApiServicesAppPatientsGetoutpatientlandinglistGetQuery(
    {
      filter: searchText,
    },
    {
      skip: searchText === '' || (searchText?.length ?? 0) <= 1,
    },
  );

  return {
    searchResult,
    isError,
    searchingForPatient,
    isSuccess,
    searchForPatient,
  };
};
