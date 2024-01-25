import {ArrowRightIcon, BinIcon} from '@/assets/svg';
import AllInputsHistoryTile from '@/components/all-inputs-history-tile';
import AppScreen from '@/components/app-screen';
import PatientInfoCard from '@/components/cards/Patients/patient-info-card';
import {AppText} from '@/components/common';
import {useAllInputsSuggestionForm} from '@/components/forms';
import {AppHeader} from '@/components/headers';
import {AppMenuSheet} from '@/components/sheets';
import AppSpacer from '@/components/spacer/AppSpacer';
import {useColors} from '@/hooks/useColors';
import {useSheet} from '@/hooks/useSheet';
import {GeneralScreenProps} from '@/navigation/types';
import {wp} from '@/resources/config';
import {
  useApiServicesAppWardemergenciesGetallGetQuery,
  useApiServicesAppWardemergenciesGetnursinginterventionsGetQuery,
  useApiServicesAppWardemergenciesGetpatientinterventionsGetQuery,
} from '@/state/services/WardEmergenciesApi';
import {
  CreatePatientInterventionRequest,
  useApiServicesAppPatientsGetpatientdetailsGetQuery,
} from '@/state/services/patientApi';
import {SnowstormSimpleResponseDto} from '@/state/services/snowstorm';
import {MenuOptionsProp} from '@/types/menusheet';
import {TEMP_AVATAR_URL} from '@/utils/constants';
import {checkDay, convertToReadableTime} from '@/utils/helpers/convertDateTime';
import {extractUniqueFieldForSnowMeds} from '@/utils/helpers/unique';
import React, {FunctionComponent, useEffect, useState} from 'react';
import {View} from 'react-native';
import {useDeleteWoundDressing} from '../../in-patient/wound-dressing/use-delete-wound-dressing';
import CollapsibleSiteCard from '../common/collapsible-site-card';
import {miscellaneousInterventionsStyles} from './styles';
import {useSaveMiscellaneousInterventions} from './use-save-miscellaneous-interventions';

const MiscellaneousInterventions: FunctionComponent<
  GeneralScreenProps<'NURSE_MISCELLANEOUS_INTERVENTIONS'>
> = ({route}) => {
  const {colors} = useColors();
  const styles = miscellaneousInterventionsStyles({colors});

  const {patientId} = route?.params ?? {};

  const {handleSaveMiscellaneousInterventions} =
    useSaveMiscellaneousInterventions();

  const {data: patientDetails} =
    useApiServicesAppPatientsGetpatientdetailsGetQuery({patientId});

  const [openInterventions, setOpenInterventions] = useState(true);

  const interventionsProps = useAllInputsSuggestionForm();
  const actionsTakenProps = useAllInputsSuggestionForm();

  const {
    selectedItems: selectedInterventions,
    handleRemoveItem: handleRemoveSelectedInterventions,
  } = interventionsProps;

  const {
    selectedItems: selectedActionsTaken,
    handleRemoveItem: handleRemoveSelectedActionTaken,
  } = actionsTakenProps;

  const {data: interventionsSuggestions} =
    useApiServicesAppWardemergenciesGetallGetQuery(undefined, {
      selectFromResult: response => ({
        ...response,
        data: response.data?.map(value => ({
          id: `${value.id}`,
          name: value.event,
        })) as SnowstormSimpleResponseDto[],
      }),
    });

  const {data: actionTakenSuggestions} =
    useApiServicesAppWardemergenciesGetnursinginterventionsGetQuery(
      {
        wardEmergencyId: selectedInterventions[0]?.id as number | undefined,
      },
      {
        refetchOnMountOrArgChange: true,
        selectFromResult: response => ({
          ...response,
          data: response.data?.map(value => ({
            id: `${value.id}`,
            name: value.name,
          })) as SnowstormSimpleResponseDto[],
        }),
      },
    );

  const handleSaveSelectedActionsTaken = () => {
    const payload: CreatePatientInterventionRequest = {
      patientId,
      encounterId: 0, //TODO(Zucci): get this from backend.
      eventId: Number(selectedInterventions[0]?.id) || 0,
      eventText: selectedInterventions[0]?.name as string,
      // TODO(Zucci): Kindly fix this by taking out the use of any
      interventionIds: selectedInterventions[0]?.id
        ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (extractUniqueFieldForSnowMeds(selectedActionsTaken, 'id') as any)
        : [],
      // TODO(Zucci): Kindly fix this by taking out the use of any
      interventionTexts: extractUniqueFieldForSnowMeds(
        selectedActionsTaken,
        'name',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ) as any,
    };
    handleSaveMiscellaneousInterventions(payload);
  };

  const handleOpenInterventions = () =>
    setOpenInterventions(!openInterventions);

  useEffect(() => {
    actionsTakenProps.setSelectedItems([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedInterventions]);

  return (
    <>
      <AppScreen
        ScreenHeader={
          <>
            <View style={styles.header}>
              <AppHeader
                paddingHorizontal={0}
                paddingBottom={0}
                middleTitle="Miscellaneous interventions"
              />
              <AppSpacer direction="bottom" marginOrPadding="padding" />
              <PatientInfoCard
                fullName={patientDetails?.fullName as string}
                code={patientDetails?.patientCode as string}
                dateOfBirth={patientDetails?.dateOfBirth}
                gender={patientDetails?.gender}
                avatar={TEMP_AVATAR_URL}
              />
            </View>
          </>
        }>
        <View style={styles.screen}>
          <View style={styles.container}>
            <CollapsibleSiteCard
              shouldOpen={openInterventions}
              onToggle={() => handleOpenInterventions()}
              formProps={interventionsProps}
              title="Intervention"
              leadingLabel="Events entered"
              suggestions={interventionsSuggestions}
              selectedData={selectedInterventions}
              isPreviewing={selectedInterventions?.length > 0}
              handleRemoveItem={handleRemoveSelectedInterventions}
            />
            <CollapsibleSiteCard
              shouldOpen={selectedInterventions?.length > 0}
              formProps={actionsTakenProps}
              title="Actions taken"
              suggestions={actionTakenSuggestions}
              selectedData={selectedActionsTaken}
              handleRemoveItem={handleRemoveSelectedActionTaken}
              onPressSave={handleSaveSelectedActionsTaken}
              summaries={<>{MiscellaneousInterventionHistory}</>}
            />
          </View>
        </View>
      </AppScreen>
    </>
  );
};

export default MiscellaneousInterventions;

const MiscellaneousInterventionHistory: FunctionComponent<{
  patientId: number;
  patientFullName: string;
}> = ({patientId, patientFullName}) => {
  const {data: patientInterventionSummaries} =
    useApiServicesAppWardemergenciesGetpatientinterventionsGetQuery({
      patientId,
    });

  return (
    <View style={{gap: wp(16)}}>
      {patientInterventionSummaries?.map(item => (
        <MiscellaneousInterventionHistoryCard
          key={item.id}
          patientFullName={patientFullName}
          item={item}
        />
      ))}
    </View>
  );
};

const MiscellaneousInterventionHistoryCard: FunctionComponent<{
  // TODO(Zucci): Kindly fix this by taking out the use of any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  item: any;
  patientFullName: string;
}> = ({item, patientFullName}) => {
  //TODO(Zucci): When the delete API for misc int is avalable, replace it
  const {handleDeleteWoundDressing, isDeletingWoundDressing} =
    useDeleteWoundDressing({
      patientFullName,
    });
  const {sheetRef, openSheet, closeSheet} = useSheet();

  const menuOptions: MenuOptionsProp = [
    {value: 'Link to care plan', onPress: () => null},
    {value: 'Mark as done', onPress: () => null},
    {value: 'Highlight for attention', onPress: () => null},
    {
      value: 'Delete',
      onPress: () => handleDeleteWoundDressing(item.id),
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
        isLoading={isDeletingWoundDressing}
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
