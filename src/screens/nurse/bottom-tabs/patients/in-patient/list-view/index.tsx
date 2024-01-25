import {FlatList} from 'react-native';
import AppActivityIndicator from '@/components/app-activity-indicator';
import React, {useEffect, useState} from 'react';
import {PatientDetails} from '@/types/doctor/nurseDoctor';
import InpatientAeCard from '@/components/cards/Patients/inpatient-ae-card';
import {InpatientNurseData} from '@/constants/nurse';

export const InpatientListView = () => {
  const [inPatients, setInpatients] = useState<PatientDetails[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFetchPatientData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setInpatients(InpatientNurseData || []);
      setIsLoading(false);
    }, 2000);
  };

  useEffect(() => {
    handleFetchPatientData();
  }, []);

  return (
    <FlatList
      data={inPatients}
      renderItem={({item}) => <InpatientAeCard item={item} />}
      keyExtractor={(_, index) => `${index}`}
      ListFooterComponent={isLoading ? <AppActivityIndicator /> : <></>}
      showsVerticalScrollIndicator={false}
    />
  );
};
