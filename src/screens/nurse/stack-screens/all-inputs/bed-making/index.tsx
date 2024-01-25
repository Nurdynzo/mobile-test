import {ArrowRightIcon, BinIcon} from '@/assets/svg';
import AllInputsHistoryTile from '@/components/all-inputs-history-tile';
import AppScreen from '@/components/app-screen';
import {AppButton} from '@/components/buttons';
import {AllInputsPanelWithTitleCard} from '@/components/cards';
import PatientInfoCard from '@/components/cards/Patients/patient-info-card';
import {AppSeperator, AppText} from '@/components/common';
import {
  AllInputsSuggestionForm,
  useAllInputsSuggestionForm,
} from '@/components/forms';
import {AppHeader} from '@/components/headers';
import {AppMenuSheet} from '@/components/sheets';
import {useSheet} from '@/hooks/useSheet';
import {GeneralScreenProps} from '@/navigation/types';
import {
  PatientBedMakingSummaryForReturnDto,
  useApiServicesAppBedmakingGetpatientsummaryGetQuery,
} from '@/state/services/bedMakingApi';
import {useApiServicesAppPatientsGetpatientdetailsGetQuery} from '@/state/services/patientApi';
import {useApiServicesAppSnowstormGetsymptomsuggestionGetQuery} from '@/state/services/snowstorm';
import {MenuOptionsProp} from '@/types/menusheet';
import {checkDay, convertToReadableTime} from '@/utils/helpers/convertDateTime';
import React, {FunctionComponent} from 'react';
import {View} from 'react-native';
import {bedMakingStyles} from './styles';
import {useDeleteBedMaking} from './use-delete-bed-making-item';
import {useSaveBedMaking} from './use-save-bed-making-item';

const BedMaking: FunctionComponent<GeneralScreenProps<'NURSE_BED_MAKING'>> = ({
  route,
}) => {
  const styles = bedMakingStyles;
  const {patientId, appointmentId} = route?.params ?? {};
  const {data: patientDetails} =
    useApiServicesAppPatientsGetpatientdetailsGetQuery({patientId});
  const {data: bedMakingSuggestionData = []} =
    useApiServicesAppSnowstormGetsymptomsuggestionGetQuery({
      inputType: 'BedMaking',
    });
  const formProps = useAllInputsSuggestionForm();
  const {reset, selectedItems} = formProps;

  const {handleSave, isCreateBedMakingLoading} = useSaveBedMaking({
    appointmentId,
    patientId,
    patientFullName: patientDetails?.fullName as string,
  });

  return (
    <>
      <AppScreen
        paddingHorizontal={24}
        contentContainerStyle={styles.gap16}
        nestedScrollEnabled
        ScreenHeader={
          <>
            <AppHeader middleTitle={'Bed making'} />
            <PatientInfoCard
              fullName={`${patientDetails?.fullName}`}
              dateOfBirth={patientDetails?.dateOfBirth}
              code={patientDetails?.patientCode}
              gender={patientDetails?.gender}
              containerStyle={styles.patientInfoCard}
            />
          </>
        }>
        <AllInputsPanelWithTitleCard title="Enter bed making details">
          <AllInputsSuggestionForm
            expandSheetHeaderTitle="Select suggestion(s) for bed making"
            formProps={formProps}
            suggestions={bedMakingSuggestionData}
          />
          <AppButton
            text="Save"
            isLoading={isCreateBedMakingLoading}
            isDisabled={isCreateBedMakingLoading}
            containerStyle={styles.saveBtn}
            onPress={() =>
              handleSave({
                selectedItems,
                reset,
              })
            }
          />

          <BedMakingHistory
            patientFullName={patientDetails?.fullName as string}
            patientId={patientId}
          />
        </AllInputsPanelWithTitleCard>
      </AppScreen>
    </>
  );
};

export default BedMaking;

const BedMakingHistory: FunctionComponent<{
  patientId: number;
  patientFullName: string;
}> = ({patientId, patientFullName}) => {
  const styles = bedMakingStyles;
  const {data: bedMakingSummaries} =
    useApiServicesAppBedmakingGetpatientsummaryGetQuery({
      patientId: patientId,
    });
  if (!bedMakingSummaries?.length) {
    return <></>;
  }
  return (
    <>
      <AppSeperator style={styles.seperator} />
      <View style={styles.gap16}>
        {bedMakingSummaries?.map(item => (
          <BedMakingHistoryCard
            key={item.id}
            patientFullName={patientFullName}
            item={item}
          />
        ))}
      </View>
    </>
  );
};

const BedMakingHistoryCard: FunctionComponent<{
  item: PatientBedMakingSummaryForReturnDto;
  patientFullName: string;
}> = ({item, patientFullName}) => {
  const {handleDeleteBedMaking, isDeletingBedMaking} = useDeleteBedMaking({
    patientFullName,
  });
  const {sheetRef, openSheet, closeSheet} = useSheet();

  const menuOptions: MenuOptionsProp = [
    {value: 'Link to care plan', onPress: () => null},
    {value: 'Mark as done', onPress: () => null},
    {value: 'Highlight for attention', onPress: () => null},
    {
      value: 'Delete',
      onPress: () => handleDeleteBedMaking(item.id),
      renderRightIcon: () => <BinIcon />,
      color: 'danger300',
    },
  ];

  return (
    <>
      <AllInputsHistoryTile
        key={item.id}
        date={checkDay(item.creationTime)}
        time={convertToReadableTime(item.creationTime)}
        onPress={openSheet}
        isLoading={isDeletingBedMaking}
        textComponent={
          <AppText text={item.note} type="body_2_semibold" color="text400" />
        }
      />
      <AppMenuSheet
        sheetRef={sheetRef}
        closeSheet={closeSheet}
        removeHeader
        renderRightIcon={() => <ArrowRightIcon />}
        menuOptions={menuOptions}
      />
    </>
  );
};
