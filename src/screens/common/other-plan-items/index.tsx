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
import {useSheet} from '@/hooks/useSheet';
import {GeneralScreenProps} from '@/navigation/types';
import {useApiServicesAppSnowstormGetsymptomsuggestionGetQuery} from '@/state/services/snowstorm';
import {MenuOptionsProp} from '@/types/menusheet';

import {checkDay, convertToReadableTime} from '@/utils/helpers/convertDateTime';
import React, {FunctionComponent} from 'react';

import {otherPlanItemsStyles} from './styles';
import {useDeleteOtherPlanItems} from './use-delete-other-plan-items';
import {useSaveOtherPlanItems as useSaveOtherPlanItemInput} from './use-save-other-plan-items';
import AllInputsHistoryListView from '@/components/all-inputs-history-list-view';
import {
  PlanItemsSummaryForReturnDto,
  useApiServicesAppPlanitemsGetpatientplanitemsGetQuery,
} from '@/state/services/planItemsApi';
import {useApiServicesAppPatientsGetpatientdetailsGetQuery} from '@/state/services/patientApi';
import AppMenuSheet from '@/components/sheets/app-menu-sheet';

const OtherPlanItems: FunctionComponent<
  GeneralScreenProps<'OTHER_PLAN_ITEMS'>
> = ({route}) => {
  const styles = otherPlanItemsStyles;
  const {patientId, appointmentId} = route?.params ?? {};
  const {data: patientDetails} =
    useApiServicesAppPatientsGetpatientdetailsGetQuery({patientId});
  const {data: otherPlanItemsSuggestionData = []} =
    useApiServicesAppSnowstormGetsymptomsuggestionGetQuery({
      inputType: 'InputNotes',
    });
  const formProps = useAllInputsSuggestionForm();
  const {reset, selectedItems} = formProps;

  const {handleSave, isCreatePlanItemLoading: isCreateOtherPlanItemLoading} =
    useSaveOtherPlanItemInput({
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
            <AppHeader middleTitle={'Other plan Items'} />
            <PatientInfoCard
              fullName={`${patientDetails?.fullName}`}
              dateOfBirth={patientDetails?.dateOfBirth}
              code={patientDetails?.patientCode}
              gender={patientDetails?.gender}
              containerStyle={styles.patientInfoCard}
            />
          </>
        }>
        <AllInputsPanelWithTitleCard title="Other plan items">
          <AllInputsSuggestionForm
            expandSheetHeaderTitle="Select suggestion(s) for Other plan items"
            formProps={formProps}
            suggestions={otherPlanItemsSuggestionData}
          />
          <AppButton
            text="Save"
            isLoading={isCreateOtherPlanItemLoading}
            isDisabled={isCreateOtherPlanItemLoading}
            containerStyle={styles.saveBtn}
            onPress={() =>
              handleSave({
                selectedItems,
                reset,
              })
            }
          />
          <AppSeperator style={styles.seperator} />
          <InputedOtherPlanItemsHistory
            patientFullName={patientDetails?.fullName as string}
            patientId={patientId}
          />
        </AllInputsPanelWithTitleCard>
      </AppScreen>
    </>
  );
};

export default OtherPlanItems;

const InputedOtherPlanItemsHistory: FunctionComponent<{
  patientId: number;
  patientFullName: string;
}> = ({patientId, patientFullName}) => {
  const styles = otherPlanItemsStyles;
  const {data: inputSummaries} =
    useApiServicesAppPlanitemsGetpatientplanitemsGetQuery({patientId});
  if (!inputSummaries?.length) {
    return <></>;
  }
  return (
    <>
      <AppSeperator style={styles.seperator} />

      <AllInputsHistoryListView
        data={inputSummaries}
        renderItem={({item}) => (
          <InputedOtherPlanItemsHistoryCard
            key={item.id}
            patientFullName={patientFullName}
            item={item}
          />
        )}
      />
    </>
  );
};

const InputedOtherPlanItemsHistoryCard: FunctionComponent<{
  item: PlanItemsSummaryForReturnDto;
  patientFullName: string;
}> = ({item, patientFullName}) => {
  const {
    handleDeleteOtherPlanItems: handleDeleteNote,
    isDeletingOtherPlanItem,
  } = useDeleteOtherPlanItems({
    patientFullName,
  });
  const {sheetRef, openSheet, closeSheet} = useSheet();

  const menuOptions: MenuOptionsProp = [
    {value: 'Link to care plan', onPress: () => null},
    {value: 'Mark as done', onPress: () => null},
    {value: 'Highlight for attention', onPress: () => null},
    {
      value: 'Delete',
      onPress: () => handleDeleteNote(item.id),
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
        isLoading={isDeletingOtherPlanItem}
        textComponent={
          <AppText
            text={item.description}
            type="body_2_semibold"
            color="text400"
          />
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
