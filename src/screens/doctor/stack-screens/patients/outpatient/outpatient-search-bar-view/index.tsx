import React from 'react';
import {useAppDispatch, useAppSelector} from '@/state/hooks';
import {
  selectOutpatientDoctorSearchTerm,
  setOutpatientDoctorSearchTerm,
  setOutpatientDoctorSelectedResult,
} from '@/state/slices/doctor/outpatient-doctor/outpatientDoctorSearchBar';
import useDebounce from '@/hooks/useDebounce';
import {useDoctorSearchPatient} from '@/hooks/doctor-patients/useDoctorSearchPatient';
import {OverlaySearchTextInput} from '@/components/inputs';
import {EMPTY_STRING} from '@/utils/constants';
import {OverlaySearchItem} from '@/components/inputs/overlay-search-text-input/type';
import {GetPatientLandingListOuptDto} from '@/state/services/patientApi';

export const OutpatientSearchBarView = () => {
  const dispatch = useAppDispatch();
  const searchText = useAppSelector(selectOutpatientDoctorSearchTerm);
  const debouncedSearchTerm = useDebounce({
    value: searchText,
  });
  const {searchResult, searchingForPatient} = useDoctorSearchPatient({
    searchText: debouncedSearchTerm,
  });

  return (
    <OverlaySearchTextInput
      showIdInSearchResult
      placeholder={'Find patient'}
      searchInputValue={searchText}
      getSelectedItem={item => {
        dispatch(setOutpatientDoctorSearchTerm(item?.name || EMPTY_STRING));
        dispatch(setOutpatientDoctorSelectedResult(item));
      }}
      data={[
        ...(searchResult?.items?.map(data => {
          return {
            id: data.patientCode,
            name: data.name,
            data: data,
          } as OverlaySearchItem<GetPatientLandingListOuptDto>;
        }) ?? []),
      ]}
      onChangeText={value => {
        dispatch(setOutpatientDoctorSearchTerm(value));
      }}
      isFetchingData={searchingForPatient}
    />
  );
};
