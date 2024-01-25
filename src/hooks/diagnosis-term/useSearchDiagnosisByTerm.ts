import {useState} from 'react';
import {useApiServicesAppSnowstormGetdiagnosisbytermGetQuery} from '@/state/services/diagnosisApi';

export const useSearchDiagnosisByTerm = () => {
  const [searchText, setSearchText] = useState<string>('');

  const {
    isError,
    isSuccess,
    currentData: searchResult = [],
    isFetching: searchingForDiagnosisByTerm,
    refetch: searchForPatient,
  } = useApiServicesAppSnowstormGetdiagnosisbytermGetQuery({
    searchTerm: searchText,
  });

  return {
    searchResult,
    searchText,
    setSearchText,
    isError,
    searchingForPatient: searchingForDiagnosisByTerm,
    isSuccess,
    searchForPatient,
  };
};
