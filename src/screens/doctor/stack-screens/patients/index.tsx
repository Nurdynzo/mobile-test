import React, {useState} from 'react';
import {useColors} from '@/hooks/useColors';
import {recordStyles} from '../../../front-desk/bottom-tabs/records/styles';
import AppScreen from '@/components/app-screen';
import {View} from 'react-native';
import {WelcomeHeader} from '@/components/headers';
import {AppButton} from '@/components/buttons';
import {AnalyticIcon} from '@/assets/svg';
import {TabButton} from '@/components/tab-button';
import {doctorPatientStyle} from './styles';
import {DoctorViewTypes} from './types';
import {OutpatientView} from '@/screens/doctor/stack-screens/patients/outpatient';
import {InpatientView} from '@/screens/doctor/stack-screens/patients/inpatient';
import * as Constants from '@/constants/index';

const Patients = () => {
  const [activeTab, setActiveTab] = useState<DoctorViewTypes | string>(
    'Outpatient',
  );
  const {colors} = useColors();
  const styles = doctorPatientStyle({colors, containerWidth: 268});
  const recordScreenStyles = recordStyles({colors});

  return (
    <AppScreen isScrollable={false}>
      <View style={styles.header}>
        <WelcomeHeader />
        <View style={styles.container}>
          {Constants.tabViewsList.map((viewLabel, index) => {
            return (
              <TabButton
                key={index}
                label={viewLabel}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                textType={'button_semibold'}
                otherStyles={styles.tabButton}
              />
            );
          })}
        </View>
      </View>
      <BodyView currentView={activeTab} />
      <AppButton
        text="Analytics"
        containerStyle={recordScreenStyles.floatingBtn}
        LeftContent={<AnalyticIcon />}
      />
    </AppScreen>
  );
};

const BodyView = ({currentView}: {currentView: DoctorViewTypes}) => {
  if (currentView === 'A&E') {
    return <></>;
  } else if (currentView === 'Inpatient') {
    return <InpatientView />;
  }
  return <OutpatientView />;
};

export default Patients;
