import {SearchPatientInput} from '@/components/inputs/search';
import {BottomIndicatorTabSwitcher} from '@/components/tabs';
import * as Contants from '@/constants/index';
import {EMPTY_STRING} from '@/utils/constants';
import React, {FunctionComponent, useState} from 'react';
import {View} from 'react-native';
import {AwaitingDoctorList} from './awaiting-doctor-list';
import {AwaitingVitalsList} from './awaiting-vitals-list';
import {nurseOutPatientStyles} from './styles';

export const OutpatientView: FunctionComponent<{
  searchResult: string;
  setSearchResult: (text: string) => void;
}> = ({searchResult, setSearchResult}) => {
  const styles = nurseOutPatientStyles;
  const [selectedTab, setSelectedTab] = useState(
    Contants.outPatientNurseTabs[0],
  );

  return (
    <>
      <View style={styles.container}>
        <SearchPatientInput
          height={40}
          placeholder="Find Patient"
          value={searchResult}
          onChangeText={setSearchResult}
          onSelectedItem={patient =>
            setSearchResult(patient.fullname ?? EMPTY_STRING)
          }
        />
        <BottomIndicatorTabSwitcher
          tabs={Contants.outPatientNurseTabs}
          onChangeTab={setSelectedTab}
          selectedTab={selectedTab}
        />
      </View>
      {selectedTab === 'Awaiting vitals' ? (
        <AwaitingVitalsList searchText={searchResult} />
      ) : (
        <AwaitingDoctorList searchText={searchResult} />
      )}
    </>
  );
};
