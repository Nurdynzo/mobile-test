import React from 'react';
import {FlatList} from 'react-native';
import {useAppSelector} from '@/state/hooks';
import {selectOutpatientDoctorSearchTerm} from '@/state/slices/doctor/outpatient-doctor/outpatientDoctorSearchBar';
import {useApiServicesAppPatientsGetoutpatientlandinglistGetQuery} from '@/state/services/patientApi';
import OutpatientCard from '@/components/cards/Patients/outpatient-card';
import AppActivityIndicator from '@/components/app-activity-indicator';

export const OutpatientListView = ({selectedSort}: {selectedSort: string}) => {
  const searchText = useAppSelector(selectOutpatientDoctorSearchTerm);

  const {data: patientList, isFetching: loadingPatientList} =
    useApiServicesAppPatientsGetoutpatientlandinglistGetQuery({
      maxResultCount: 10,
      sorting: selectedSort,
    });

  // TODO(Michael): Add other filtering requirments according to the business requirement
  const filteredOutpatientList =
    patientList?.items?.filter(
      data =>
        data?.name?.toLowerCase().includes(searchText.toLowerCase()) ||
        data?.patientCode?.toLowerCase().includes(searchText.toLowerCase()),
    ) ?? [];
  return (
    <FlatList
      data={filteredOutpatientList}
      renderItem={({item}) => <OutpatientCard item={item} />}
      keyExtractor={(_, index) => `${index}`}
      ListFooterComponent={
        loadingPatientList ? <AppActivityIndicator /> : <></>
      }
      showsVerticalScrollIndicator={false}
    />
  );
};
