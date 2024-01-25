import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  Pressable,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Constants from '@/constants/index';
import {hp, wp} from '@/resources/config';
import {ScreenProps} from '@/types/navigation';
import {useSheet} from '@/hooks/useSheet';
import {DiagnosisState, Pill} from '@/types/doctor/diagnosis';
import {
  DiagnosisItemDto,
  useApiServicesAppDiagnosisCreatediagnosisPostMutation,
} from '@/state/services/diagnosisApi';
import {useApiServicesAppSnowstormGetdiagnosisbytermGetQuery} from '@/state/services/snowstorm';
import {useApiServicesAppDiagnosisGetpatientdiagnosisGetQuery} from '@/state/services/patientApi';
import {useColors} from '@/hooks/useColors';
import {allInputStyles} from '@/screens/doctor/stack-screens/allInputs/styles';
import {
  buttonStyles,
  doctorPatientStyle,
} from '@/screens/doctor/bottom-tabs/patients/styles';
import PatientInfoCard from '@/components/cards/Patients/patient-info-card';
import AppSpacer from '@/components/spacer/AppSpacer';
import {AppText} from '@/components/common';
import {showToast} from '@/components/app-toast';
import {TabButton} from '@/components/tab-button';
import AppTextInput from '@/components/inputs/app-text-input';
import {
  ArrowRightIcon,
  CloseIcon,
  MoreVerticalIcon,
  PlusCircleIcon,
} from '@/assets/svg';
import SearchResultCard from '@/components/cards/search-result-card';
import {EMPTY_STRING, NOT_AVAILABLE} from '@/utils/constants';
import AppRow from '@/components/common/app-row';
import AppMenuSheet from '@/components/sheets/app-menu-sheet';
import AppButton from '@/components/buttons/app-button';
import {AllInputSummaryList} from '@/components/all-input-summary-list';
import AppScreen from '@/components/app-screen';
import AppHeader from '@/components/headers/app-header';

export function Diagnosis({route}: ScreenProps) {
  const {
    avatar,
    appointmentId,
    gender,
    patientCode,
    patientName,
    age,
    patientId,
  } = route?.params || {};

  const {
    sheetRef: editSelectedDiagnosisSheet,
    openSheet: openEditSelectedDiagnosisSheet,
  } = useSheet();

  const [activeTab, setActiveTab] = useState<
    'Diagnosis' | 'Differential' | string
  >('Diagnosis');

  const [diagnosisState, setDiagnosisState] = useState<DiagnosisState>({
    mainSearchResult: EMPTY_STRING,
    note: EMPTY_STRING,
    activePills: [],
    diagnosisBodyPart: EMPTY_STRING,
  });
  const [diagnosisDifferentialStates, setDiagnosisDifferentialStates] =
    useState<DiagnosisState[]>([]);
  const [showSearch, setShowSearch] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [addDiagnosisRequest] =
    useApiServicesAppDiagnosisCreatediagnosisPostMutation();

  const {data, isLoading} =
    useApiServicesAppSnowstormGetdiagnosisbytermGetQuery(
      {
        searchTerm: diagnosisState?.diagnosisBodyPart,
      },
      {
        skip:
          diagnosisState?.diagnosisBodyPart === EMPTY_STRING ||
          diagnosisState?.diagnosisBodyPart?.length <= 3,
      },
    );

  const {data: notesData} =
    useApiServicesAppDiagnosisGetpatientdiagnosisGetQuery({
      patientId: patientId,
    });

  const chosenTitle =
    activeTab === 'Diagnosis' ? 'Clinical diagnosis' : 'Differential diagnosis';

  const {colors} = useColors();
  const styles = allInputStyles({colors});
  const button = buttonStyles({colors, bg: colors?.information50});
  const patientStyle = doctorPatientStyle({
    colors,
    hasResults: [...(data || [])]?.length > 0,
  });

  useEffect(() => {
    if (diagnosisState.diagnosisBodyPart?.length < 3) {
      setShowSearch(false);
    }
  }, [diagnosisState]);

  const isAddingDiagnosisAllowed =
    diagnosisState.activePills && diagnosisState.activePills.length > 0;

  useEffect(() => {
    setDiagnosisState({
      mainSearchResult: EMPTY_STRING,
      note: EMPTY_STRING,
      activePills: [],
      diagnosisBodyPart: EMPTY_STRING,
    });
  }, [activeTab]);

  function combineStateToDraftString(
    mainSearchResult: string,
    note: string,
    diagnosisBodyPart: string,
  ): string {
    let result = EMPTY_STRING;

    if (
      mainSearchResult === 'Clinical diagnosis' ||
      mainSearchResult === 'Differential diagnosis'
    ) {
      result = `${diagnosisBodyPart}`;
      if (note !== EMPTY_STRING) {
        result += `, ${note}.`;
      } else {
        result += '.';
      }
    }

    return result;
  }

  const changeFormat = (activePills: Pill[]) => {
    if (Array.isArray(activePills) && activePills.length > 0) {
      const value = activePills.map(val => {
        return {
          name: val.value,
          type: val.type === 'Diagnosis' ? 0 : 1,
        };
      });
      return value as DiagnosisItemDto[];
    }
    return [] as DiagnosisItemDto[];
  };

  const onSave = async () => {
    setIsSubmitting(true);
    const selectedDiagnoses = changeFormat(
      diagnosisDifferentialStates.map(val => val.activePills[0]) as Pill[],
    );

    const note = diagnosisDifferentialStates
      .map(state => state.note.trim())
      .filter(Boolean)
      .join(', ');

    const response = await addDiagnosisRequest({
      createDiagnosisDto: {
        patientId: patientId,
        sctid: appointmentId,
        notes: note,
        selectedDiagnoses,
      },
    });
    if (response) {
      showToast('SUCCESS', {
        title: `${activeTab} saved successfully`,
        message: `${activeTab} have been saved for this encounter successfully`,
      });
      setDiagnosisDifferentialStates([]);
    }

    setIsSubmitting(false);
  };

  const handleAddDiagnosis = () => {
    Keyboard.dismiss();
    if (isAddingDiagnosisAllowed) {
      const newStates = [...diagnosisDifferentialStates];
      newStates.push(diagnosisState);
      setDiagnosisDifferentialStates(newStates);
      setDiagnosisState({
        mainSearchResult: EMPTY_STRING,
        note: EMPTY_STRING,
        activePills: [],
        diagnosisBodyPart: EMPTY_STRING,
      });
    }
  };

  const headerComponent = () => (
    <>
      <PatientInfoCard
        fullName={patientName}
        code={patientCode}
        dateOfBirth={age}
        gender={gender}
        avatar={avatar}
      />
      <AppSpacer direction="top" size={30} />
      <View style={styles.cardWrapper}>
        <View style={styles.wrapper}>
          <AppText
            style={styles.cardTitle}
            type="body_1_bold"
            color="text400"
            text={'Diagnosis'}
          />
        </View>
        <View style={styles.line} />
        <AppSpacer direction="top" />
        <View style={styles.tabButtonContainer}>
          {Constants.diagnosisTabViewsList.map((viewLabel, index) => {
            return (
              <TabButton
                key={index}
                label={viewLabel}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                inActiveBgColor="neutral25"
                width={wp(100)}
              />
            );
          })}
        </View>
        <AppSpacer direction="top" />

        {diagnosisState.activePills?.length === 0 ? (
          <AppTextInput
            placeholder={`Add ${activeTab}`}
            RightContent={
              diagnosisState?.diagnosisBodyPart ? null : (
                <PlusCircleIcon fill={colors.text50} />
              )
            }
            value={diagnosisState.diagnosisBodyPart}
            onChangeText={value => {
              setShowSearch(true);
              setDiagnosisState({
                ...diagnosisState,
                diagnosisBodyPart: value,
                mainSearchResult: chosenTitle,
              });
            }}
          />
        ) : (
          <View style={button.buttonParent}>
            <View style={button.searchItem}>
              <AppText
                color="text400"
                text={diagnosisState?.diagnosisBodyPart}
              />
              <TouchableOpacity
                style={button.closeButton}
                onPress={() =>
                  setDiagnosisState({
                    mainSearchResult: EMPTY_STRING,
                    note: EMPTY_STRING,
                    activePills: [],
                    diagnosisBodyPart: EMPTY_STRING,
                  })
                }>
                <CloseIcon fill={colors.text300} width={hp(16)} />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {showSearch ? (
          <View
            style={[patientStyle.resultsContainer, styles.resultCardWrapper]}>
            <AppSpacer direction="top" size={3} />
            <FlatList
              data={data}
              keyExtractor={item => `${item?.id}`}
              renderItem={({item}) => (
                <SearchResultCard
                  showId={false}
                  name={item.name ?? NOT_AVAILABLE}
                  id={item.id ?? NOT_AVAILABLE}
                  onPress={() => {
                    setDiagnosisState({
                      ...diagnosisState,
                      diagnosisBodyPart: item?.name || EMPTY_STRING,
                      mainSearchResult: chosenTitle,
                      activePills: [
                        {
                          type: activeTab,
                          value: item?.name || EMPTY_STRING,
                        },
                      ],
                    });
                    setShowSearch(false);
                    Keyboard.dismiss();
                  }}
                />
              )}
              ListFooterComponent={isLoading ? <ActivityIndicator /> : null}
              getItemLayout={(_, index) => ({
                length: 200,
                offset: 200 * index,
                index,
              })}
              initialNumToRender={30}
              maxToRenderPerBatch={30}
              keyboardShouldPersistTaps="handled"
            />
          </View>
        ) : null}
        <AppSpacer direction="top" />
        <AppTextInput
          placeholder={`Enter ${activeTab} notes`}
          multiline
          numberOfLines={5}
          height={104}
          value={diagnosisState.note}
          onChangeText={value => {
            setDiagnosisState({
              ...diagnosisState,
              note: value,
            });
          }}
        />
        <AppSpacer direction="top" />

        <AppRow extraStyles={{justifyContent: 'flex-end'}}>
          <Pressable onPress={handleAddDiagnosis}>
            <PlusCircleIcon
              fill={
                isAddingDiagnosisAllowed ? colors.primary400 : colors.text50
              }
            />
          </Pressable>
          <AppText
            style={[styles.cardTitle, styles.textUnderLine]}
            type="paragraph_2_medium"
            color={isAddingDiagnosisAllowed ? 'primary400' : 'primary50'}
            text={`Add ${activeTab}`}
            onPress={handleAddDiagnosis}
          />
        </AppRow>
        <AppSpacer direction="top" />
        {diagnosisDifferentialStates &&
          diagnosisDifferentialStates?.map((item, index) => (
            <View key={index}>
              <View style={patientStyle.rowSpaceBetween}>
                <AppText
                  text={`${
                    item?.mainSearchResult
                  } - ${combineStateToDraftString(
                    item?.mainSearchResult,
                    item?.note,
                    item?.diagnosisBodyPart,
                  )}`}
                />
                <Pressable onPress={() => openEditSelectedDiagnosisSheet()}>
                  <MoreVerticalIcon />
                </Pressable>
              </View>
              <AppSpacer direction="top" />
              <AppMenuSheet
                title=""
                sheetRef={editSelectedDiagnosisSheet}
                menuOptions={[
                  {
                    value: 'Edit',
                  },
                  {
                    value: 'Remove',
                  },
                ]}
                renderRightIcon={() => <ArrowRightIcon />}
                showSearchInput={false}
                onSelectItem={value => {
                  if (value.item === 'Edit') {
                    setDiagnosisState(diagnosisDifferentialStates[index]);
                    const newStates = diagnosisDifferentialStates.filter(
                      (_, i) => i !== index,
                    );
                    setDiagnosisDifferentialStates(newStates);
                  }
                  if (value.item === 'Remove') {
                    const newStates = diagnosisDifferentialStates.filter(
                      (_, i) => i !== index,
                    );
                    setDiagnosisDifferentialStates(newStates);
                  }
                }}
              />
            </View>
          ))}
        <AppSpacer direction="top" />
        <AppButton
          text="Save"
          isDisabled={diagnosisDifferentialStates.length === 0 || isSubmitting}
          onPress={onSave}
          isLoading={isSubmitting}
        />
        <AppSpacer direction="top" />
        <AllInputSummaryList summaryData={notesData} />
      </View>
    </>
  );

  return (
    <AppScreen
      isScrollable={false}
      paddingHorizontal={24}
      ScreenHeader={<AppHeader middleTitle="Diagnosis" />}>
      {headerComponent()}
    </AppScreen>
  );
}
