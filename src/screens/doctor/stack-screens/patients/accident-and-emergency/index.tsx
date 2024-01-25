import {useColors} from '@/hooks/useColors';
import {doctorPatientStyle} from '@/screens/doctor/stack-screens/patients/styles';
import {useSheet} from '@/hooks/useSheet';
import {useApiServicesAppWardsGetallwardsGetQuery} from '@/state/services/wardApi';
import React, {useState} from 'react';
import {View} from 'react-native';
import {AppRow} from '@/components/common';
import {CommonMenuView} from '@/screens/doctor/stack-screens/patients/common/common-menu-view';
import {SortByButtonView} from '@/screens/doctor/stack-screens/patients/common/sort-by-button-view';
import {AccidentAndSurgeryListView} from '@/screens/doctor/stack-screens/patients/accident-and-emergency/accident-and-emergency-list-view';
import * as Constants from '@/constants/index';

export function AccidentAndEmergencyView() {
  const {colors} = useColors();
  const styles = doctorPatientStyle({colors});
  const {sheetRef: wardsRef, openSheet: openWardsSheet} = useSheet();
  const {data: wards} = useApiServicesAppWardsGetallwardsGetQuery();
  const transformedData = wards?.map(ward => ({value: ward.name || ''})) || [];

  const {
    sheetRef: sortSheetRef,
    openSheet: openSortBySheet,
    closeSheet: closeSortBySheet,
  } = useSheet();

  const [selectedSort, setSelectedSort] = useState<string>(
    Constants.sortByOptions[0]?.value,
  );

  const handleGetSelectedSortValue = () => {
    let sortValue = '';
    if (selectedSort) {
      const value = Constants.sortByOptions.find(f => f.value === selectedSort);
      if (value) {
        sortValue = value?.value;
      }
    }
    return sortValue;
  };

  const handleSelectedSort = (sort: {item: string}) => {
    const sortKey = Constants.sortByOptions?.find(
      f => f?.value === sort?.item,
    )?.value;
    if (sortKey) {
      setSelectedSort(sortKey);
    }
    closeSortBySheet();
  };

  return (
    <>
      <View style={{paddingHorizontal: styles.header.paddingHorizontal}}>
        <AppRow>
          <CommonMenuView
            sheetRef={wardsRef}
            openSheet={openWardsSheet}
            buttonText={'Wards'}
            sheetTitle={'Wards'}
            showSearchInput={false}
            menuOptions={transformedData}
          />
          <SortByButtonView
            sheetRef={sortSheetRef}
            openSortBySheet={openSortBySheet}
            onSelectItem={handleSelectedSort}
            selectedValue={handleGetSelectedSortValue()}
            reset={() => setSelectedSort(Constants.sortByOptions[0]?.value)}
          />
        </AppRow>
      </View>
      <AccidentAndSurgeryListView />
    </>
  );
}
