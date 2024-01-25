import React, {useState} from 'react';
import {useColors} from '@/hooks/useColors';
import {doctorPatientStyle} from '@/screens/doctor/stack-screens/patients/styles';
import {useSheet} from '@/hooks/useSheet';
import {AppRow} from '@/components/common';
import {View} from 'react-native';
import {CommonMenuView} from '@/screens/doctor/stack-screens/patients/common/common-menu-view';
import {SortByButtonView} from '@/screens/doctor/stack-screens/patients/common/sort-by-button-view';
import {OutpatientListView} from '@/screens/doctor/stack-screens/patients/outpatient/outpatient-list-view';
import {useApiServicesAppPatientappointmentsGetconsultingroomsGetQuery} from '@/state/services/roomApi';
import {OutpatientSearchBarView} from '@/screens/doctor/stack-screens/patients/outpatient/outpatient-search-bar-view';
import * as Constants from '@/constants/index';

export const OutpatientView = () => {
  const {colors} = useColors();
  const styles = doctorPatientStyle({colors});
  const {sheetRef: consultingRoomsRef, openSheet: openConsultingRoomsSheet} =
    useSheet();

  const {
    sheetRef: sortSheetRef,
    openSheet: openSortBySheet,
    closeSheet: closeSortBySheet,
  } = useSheet();

  const [selectedSort, setSelectedSort] = useState<string>(
    Constants.sortByOptions[0]?.value,
  );

  const {data: roomList} =
    useApiServicesAppPatientappointmentsGetconsultingroomsGetQuery();

  const transformedData = roomList?.rooms?.map(room => ({value: room})) ?? [];

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
        <OutpatientSearchBarView />
        <AppRow>
          <CommonMenuView
            sheetRef={consultingRoomsRef}
            openSheet={openConsultingRoomsSheet}
            buttonText={'Consulting room'}
            sheetTitle={'Consulting rooms'}
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
      <OutpatientListView selectedSort={selectedSort} />
    </>
  );
};
