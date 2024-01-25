import AppScreen from '@/components/app-screen';
import PatientInfoCard from '@/components/cards/Patients/patient-info-card';
import {AppHeader} from '@/components/headers';
import {AppTabComponent} from '@/components/tabs/tab-switch';
import {tabsForProcedures} from '@/constants/procedures';
import {wp} from '@/resources/config';
import React, {useState} from 'react';
import {View} from 'react-native';
import RecordProceduresView from './common/record';
import RequestProceduresView from './common/request-procedures-view';
import {TabNamesTypes} from './types';

const Procedures = () => {
  const [activeTab, setActiveTab] = useState<TabNamesTypes>(
    tabsForProcedures[0].title as TabNamesTypes,
  );

  return (
    <AppScreen
      isScrollable={false}
      ScreenHeader={<AppHeader middleTitle="Procedures" paddingBottom={0} />}>
      <View style={{paddingHorizontal: wp(24)}}>
        <PatientInfoCard
          fullName={'Zucci Daniel'}
          code={'4343'}
          dateOfBirth={'43'}
          gender={'Male'}
        />

        <AppTabComponent
          tabs={tabsForProcedures}
          activeTab={activeTab}
          setActiveTab={tabKey => setActiveTab(tabKey as TabNamesTypes)}
          extraStyles={{marginVertical: wp(16)}}
        />
      </View>
      {activeTab === 'Request procedures' ? (
        <RequestProceduresView />
      ) : (
        <RecordProceduresView />
      )}
    </AppScreen>
  );
};

export default Procedures;
