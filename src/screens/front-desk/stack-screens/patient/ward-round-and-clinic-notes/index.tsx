import {FilterIcon} from '@/assets/svg';
import AppScreen from '@/components/app-screen';
import {AppButton, AppIconButton} from '@/components/buttons';
import PatientInfoCard from '@/components/cards/Patients/patient-info-card';
import {AppText} from '@/components/common';
import {AppHeader} from '@/components/headers';
import AppSelectItemSheet from '@/components/sheets/app-select-item-sheet';
import {AppTabButtonSwitcher} from '@/components/tabs';
import * as Constants from '@/constants/index';
import {useColors} from '@/hooks/useColors';
import {useSheet} from '@/hooks/useSheet';
import {routesNames} from '@/navigation/routes';
import {GeneralScreenProps} from '@/navigation/types';
import {useApiServicesAppPatientsGetpatientwardroundandclinicnotesGetQuery} from '@/state/services/wardApi';
import {BaseSheetProps} from '@/types/sheet';
import React, {FunctionComponent, useState} from 'react';
import {FlatList, View} from 'react-native';
import {wardRoundAndClinicNoteStyles} from './styles';
import WardroundClinicNoteItemCard from './ward-round-clinic-card';
import {useAppSelector} from '@/state/hooks';
import {selectPatient} from '@/state/slices/patient/selectedPatient';

const WardRoundAndClinicNotes: FunctionComponent<
  GeneralScreenProps<'FD_WARD_ROUND_AND_CLINIC_NOTES'>
> = ({navigation}) => {
  const {colors} = useColors();

  const styles = wardRoundAndClinicNoteStyles;

  const patient = useAppSelector(selectPatient);

  const {data: patientRecentWardClinicNoteData} =
    useApiServicesAppPatientsGetpatientwardroundandclinicnotesGetQuery({
      patientId: patient.id,
    });

  const {
    closeSheet: closeFilterSheet,
    openSheet: openFilterSheet,
    sheetRef: filterSheetRef,
  } = useSheet();

  return (
    <AppScreen
      isScrollable={false}
      ScreenHeader={
        <>
          <AppHeader
            middleTitle="Ward round & Clinic notes"
            RightContent={
              <AppIconButton
                icon={<FilterIcon fill={colors.primary400} />}
                onPress={openFilterSheet}
                height={44}
                width={44}
              />
            }
          />
          <View style={styles.subHeader}>
            <PatientInfoCard
              fullName={patient.fullName}
              dateOfBirth={patient?.dateOfBirth}
              code={patient.code}
              gender={patient.gender}
            />

            <AppButton
              text="View paper records"
              onPress={() =>
                navigation.navigate(routesNames.VIEW_PARER_RECORDS_TAB, {
                  patient: {
                    id: patient.id,
                    code: patient.code,
                  },
                  disableRegularTab: true,
                })
              }
            />
          </View>
        </>
      }>
      <FlatList
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <AppText
            text={'Recent activities'}
            type="title_semibold"
            color="text400"
          />
        }
        data={patientRecentWardClinicNoteData?.items}
        keyExtractor={(item, index) => `${item.clinic}-${item.ward}-${index}`}
        renderItem={({item}) => (
          <WardroundClinicNoteItemCard
            clinic={item?.clinic as string}
            date={item?.dateTime ? new Date(item?.dateTime) : undefined}
            patientFullName={patient.fullName}
          />
        )}
        contentContainerStyle={styles.screenContainer}
      />
      <FilterSheet sheetRef={filterSheetRef} closeSheet={closeFilterSheet} />
    </AppScreen>
  );
};

export default WardRoundAndClinicNotes;

const FilterSheet: FunctionComponent<BaseSheetProps> = ({
  closeSheet,
  sheetRef,
}) => {
  const [currentFilterTab, setCurrentFilterTab] = useState(
    Constants.WardRoundAndClinicNotesFilterByOptions[0].name,
  );
  const styles = wardRoundAndClinicNoteStyles;

  return (
    <AppSelectItemSheet
      sheetRef={sheetRef}
      title="Filter by"
      AdditionalHeaderContent={
        <AppTabButtonSwitcher
          selectedTab={currentFilterTab}
          tabs={Constants.WardRoundAndClinicNotesFilterByOptions}
          onChangeTab={i => setCurrentFilterTab(i)}
          tabProps={{
            otherStyles: styles.tab,
            activeTextColor: 'text400',
            inActiveTextColor: 'text300',
            activeBgColor: 'neutral100',
            inActiveBgColor: 'transparent',
            textType: 'button_semibold',
          }}
        />
      }
      closeSheet={closeSheet}
      selectOptions={[]}
    />
  );
};
