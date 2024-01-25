import AppActivityIndicator from '@/components/app-activity-indicator';
import {PatientAwaitingDoctorCard} from '@/components/cards';
import {wp} from '@/resources/config';
import {useApiServicesAppPatientsGetoutpatientlandinglistGetQuery} from '@/state/services/patientApi';
import React from 'react';
import {FlatList} from 'react-native';

export const AwaitingDoctorList = ({searchText}: {searchText: string}) => {
  const {data: patientList, isFetching: loadingPatientList} =
    useApiServicesAppPatientsGetoutpatientlandinglistGetQuery({
      maxResultCount: 10,
      filter: searchText,
      // TODO(Franklyn): to render by status which is Awaiting doctor
      // status: 'Awaiting doctor',
    });

  return (
    <FlatList
      data={patientList?.items}
      renderItem={({item}) => (
        <PatientAwaitingDoctorCard
          data={item}
          mostRecentVitals={
            'Resp rate: 24 cpm, Pulse rate: 72 bpm, GCS: 4, BP: 130/90 mmHg, Weight: 67 kg'
          }
          diagnosis={
            'Malaria, Gastric carcinoma, Coccidosis, Pertusis, Typhoid'
          }
          isBusyWithPhysician
        />
      )}
      keyExtractor={(_, index) => `${index}`}
      ListFooterComponent={
        loadingPatientList ? <AppActivityIndicator /> : <></>
      }
      contentContainerStyle={{paddingBottom: wp(100)}}
      showsVerticalScrollIndicator={false}
    />
  );
};
