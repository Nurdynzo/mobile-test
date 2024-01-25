import AppScreen from '@/components/app-screen';
import PatientInfoCard from '@/components/cards/Patients/patient-info-card';
import {AppHeader} from '@/components/headers';
import {ScrollableTab} from '@/components/tabs';
import {tabsForInvestigations} from '@/constants/investigations';
import {wp} from '@/resources/config';
import {EMPTY_STRING} from '@/utils/constants';
import React, {useState} from 'react';
import {View} from 'react-native';
import RecentResultForInvestigations from './recent-result-for-investigations';
import RecordInvestigations from './record-investigations';
import RequestInvestigations from './request-investigations';

const Investigations = () => {
  const [currentTab, setCurrentTab] = useState<number | null>(0);

  return (
    <AppScreen
      ScreenHeader={
        <>
          <AppHeader middleTitle="Investigations" />
          <View style={{paddingHorizontal: wp(16)}}>
            <PatientInfoCard
              fullName={'Zucci Daniel'}
              code={'HOSP1000808'}
              gender={'Male'}
              avatar={EMPTY_STRING}
            />
          </View>
          <ScrollableTab
            tabs={tabsForInvestigations}
            currentIndex={currentTab}
            activeColor={{background: 'default300'}}
            unActiveColor={{background: 'neutral100'}}
            onPress={index =>
              setCurrentTab(currentTab !== index ? index : null)
            }
            style={{paddingVertical: wp(10)}}
          />
        </>
      }>
      <View style={{paddingHorizontal: wp(16)}}>
        {renderContent(currentTab)}
      </View>
    </AppScreen>
  );
};

const renderContent = (activeTab: number | null) => {
  switch (activeTab) {
    case 0:
      return <RecentResultForInvestigations />;
    case 1:
      return <RequestInvestigations />;
    case 2:
      return <RecordInvestigations />;

    default:
      return <></>;
  }
};

export default Investigations;
