import {useEffect, useState} from 'react';
import {
  ClinicListDto,
  useApiServicesAppOrganizationunitGetclinicsGetQuery,
} from '../../state/services/organizationUnit';
import {SelectItemOptionsProp} from '../../types/selectItemsheet';

/*NOTE:
ZUCCI: SCROLL LOADING ISN'T HANDLED HERE YET. (B.E)
*/

export const useGetAllClinics = () => {
  const [queryForClinic, setQueryForClinics] = useState('');

  const {
    isLoading: isLoadingAllClinics,
    data: allClinics,
    isError: isFailedToGetClinics,
  } = useApiServicesAppOrganizationunitGetclinicsGetQuery();

  const [selectedClinic, setSelectedClinic] = useState<string>('');

  useEffect(() => {
    if (allClinics && !selectedClinic) {
      //set a default
    }
  }, [allClinics, selectedClinic]);

  const formatAllClinics = (data: Array<ClinicListDto>) => {
    if (data) {
      return data?.map(({displayName, id, isActive}) => ({
        item: {
          value: displayName,
          id,
          isActive,
          label: displayName,
        },
      })) as SelectItemOptionsProp;
    } else {
      return [];
    }
  };

  const handleAllClinics = () => {
    if (queryForClinic) {
      return formatAllClinics(allClinics || []).filter(option =>
        `${option.item.value}`
          .toLowerCase()
          .includes(`${queryForClinic}`.toLowerCase()),
      );
    } else {
      return formatAllClinics(allClinics || []);
    }
  };

  return {
    allClinics,
    isLoadingAllClinics,
    isFailedToGetClinics,
    formatAllClinics,
    queryForClinic,
    setQueryForClinics,
    handleAllClinics,
    selectedClinic,
    setSelectedClinic,
  };
};
