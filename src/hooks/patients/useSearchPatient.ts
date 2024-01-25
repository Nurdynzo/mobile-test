import {useState} from 'react';
import {useApiServicesAppPatientsSearchpatientGetQuery} from '../../state/services/patientApi';

/*NOTE:
ZUCCI SCROLL LOADING ISN'T HANDLED HERE YET. (B.E)
*/
export const useSearchPatient = () => {
  const [searchText, setSearchText] = useState<string>('');
  const {
    isError,
    isFetching: searchingForPatient,
    isSuccess,
    currentData: searchResult,
    refetch: searchForPatient,
  } = useApiServicesAppPatientsSearchpatientGetQuery(
    {
      searchText: searchText,
    },
    {
      skip: searchText === '' || searchText.length <= 1,
    },
  );

  return {
    searchResult,
    searchText,
    setSearchText,
    isError,
    searchingForPatient,
    isSuccess,
    searchForPatient,
  };
};
