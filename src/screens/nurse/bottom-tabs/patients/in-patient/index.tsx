import {AppRow} from '@/components/common';
import {useColors} from '@/hooks/useColors';
import {useSheet} from '@/hooks/useSheet';
import {InpatientListView} from '@/screens/doctor/stack-screens/patients/inpatient/inpatient-list-view';
import {InpatientSearchBarView} from '@/screens/doctor/stack-screens/patients/inpatient/inpatient-search-bar-view';
import {doctorPatientStyle} from '@/screens/doctor/stack-screens/patients/styles';
import {useApiServicesAppWardsGetallwardsGetQuery} from '@/state/services/wardApi';
import React, {FunctionComponent} from 'react';
import {View} from 'react-native';
import {CommonMenuView} from './common-menu-view';
import {EMPTY_STRING} from '@/utils/constants';

export const InpatientView: FunctionComponent = () => {
  const {colors} = useColors();
  const styles = doctorPatientStyle({colors});
  const {sheetRef: wardsRef, openSheet: openWardsSheet} = useSheet();
  const {data: wards} = useApiServicesAppWardsGetallwardsGetQuery();
  const transformedData =
    wards?.map(ward => ({value: ward.name || EMPTY_STRING})) ?? [];

  return (
    <>
      <View style={{paddingHorizontal: styles.header.paddingHorizontal}}>
        <InpatientSearchBarView />
        <AppRow>
          <CommonMenuView
            sheetRef={wardsRef}
            openSheet={openWardsSheet}
            buttonText={'Wards A'}
            sheetTitle={'Wards'}
            showSearchInput={false}
            menuOptions={transformedData}
          />
        </AppRow>
      </View>
      <InpatientListView />
    </>
  );
};
