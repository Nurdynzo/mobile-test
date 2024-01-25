import AppScreen from '@/components/app-screen';
import PatientInfoCard from '@/components/cards/Patients/patient-info-card';
import {AppHeader} from '@/components/headers';
import {AppTabComponent} from '@/components/tabs/tab-switch';
import {useColors} from '@/hooks/useColors';
import {wp} from '@/resources/config';
import {
  GetPatientDetailsOutDto,
  useApiServicesAppPatientsGetpatientdetailsGetQuery,
} from '@/state/services/patientApi';
import {TEMP_AVATAR_URL} from '@/utils/constants';
import React, {useState} from 'react';
import {View} from 'react-native';
import {PrescribeMedicationView} from './prescribe-medication';
import {prescriptionStyles} from './styles';
import {Vaccination} from './vaccination';
import {GeneralScreenProps} from '@/navigation/types';

export const PrescriptionScreen = ({
  route,
}: GeneralScreenProps<'DOCTOR_PRESCRIPTIONS'>) => {
  const {patientId} = route?.params ?? {};
  const [activeTab, setActiveTab] = useState('2');
  const {colors} = useColors();
  const styles = prescriptionStyles({colors});
  const {data: patientDetails} =
    useApiServicesAppPatientsGetpatientdetailsGetQuery({patientId});
  return (
    <AppScreen
      paddingHorizontal={24}
      ScreenHeader={
        <>
          <AppHeader middleTitle="Prescription" paddingBottom={0} />
          <View style={styles.cardHeader}>
            <PatientInfoCard
              fullName={patientDetails?.fullName as string}
              code={patientDetails?.patientCode as string}
              dateOfBirth={patientDetails?.dateOfBirth}
              gender={patientDetails?.gender}
              avatar={TEMP_AVATAR_URL}
            />
          </View>
        </>
      }>
      <View style={{gap: wp(15)}}>
        <AppTabComponent
          tabs={[
            {key: '1', title: 'Prescribe medication'},
            {key: '2', title: 'Vaccination'},
          ]}
          activeTab={activeTab}
          setActiveTab={tabKey => setActiveTab(tabKey)}
        />
        {activeTab === '1' ? (
          <PrescribeMedicationView patientId={patientId} />
        ) : (
          <Vaccination
            patientDetails={patientDetails as GetPatientDetailsOutDto}
          />
        )}
      </View>
    </AppScreen>
  );
};
