import React, {useState} from 'react';
import {AppText} from '@/components/common';
import AppSpacer from '@/components/spacer/AppSpacer';
import {Pressable, ScrollView, TouchableOpacity, View} from 'react-native';
import {AppPillsContainer} from '@/components/app-pills-container/AppPillsContainer';
import {useColors} from '@/hooks/useColors';
import {allInputStyles} from '@/screens/doctor/stack-screens/allInputs/styles';
import {PrescriptionSearchBarView} from '@/screens/doctor/stack-screens/allInputs/prescription/common/search-bar-view';
import {AppTextInput} from '@/components/inputs';
import AppTextInputSelect from '@/components/inputs/app-text-input-select';
import AppSelectInput from '@/components/inputs/app-select-input';
import {CloseCircledIcon, CloseIcon, PlusCircleIcon} from '@/assets/svg';
import {AppButton} from '@/components/buttons';
import {AllInputSummaryList} from '@/components/all-input-summary-list';
import {
  useApiServicesAppMedicationCreatemedicationPostMutation,
  useApiServicesAppMedicationGetmedicationsuggestionsGetQuery,
  useApiServicesAppMedicationGetpatientprescriptionsGetQuery,
} from '@/state/services/medicationApi';
import AppDivider from '@/components/app-divider';
import {useSheet} from '@/hooks/useSheet';
import {hp} from '@/resources/config';
import {buttonStyles} from '@/screens/doctor/bottom-tabs/patients/styles';
import AppRow from '@/components/common/app-row';
import {SelectedPrescriptionList} from '@/screens/doctor/stack-screens/allInputs/prescription/prescribe-medication/selected-prescription-list';
import {PrescriptionState} from '@/screens/doctor/stack-screens/allInputs/prescription/types';
import {EMPTY_STRING} from '@/utils/constants';
import {useHandleAddPrescription} from '@/screens/doctor/stack-screens/allInputs/prescription/prescribe-medication/use-handle-add-prescription';
import {useManageActivePills} from '@/screens/doctor/stack-screens/allInputs/prescription/prescribe-medication/use-manage-active-pills';
import {usePrescriptionFormValidation} from '@/screens/doctor/stack-screens/allInputs/prescription/prescribe-medication/use-prescription-form-validation';
import {useSavePrescription} from '@/screens/doctor/stack-screens/allInputs/prescription/prescribe-medication/use-save-prescriptions';

export function PrescribeMedicationView({patientId}: {patientId: number}) {
  const {colors} = useColors();
  const styles = allInputStyles({colors});
  const button = buttonStyles({colors, bg: colors?.information50});
  const initialState = {
    activePills: [],
    dosage: null,
    note: EMPTY_STRING,
    direction: null,
    frequency: null,
    mainSearchResult: EMPTY_STRING,
    duration: null,
  };
  const {
    sheetRef: editSelectedPrescriptionSheet,
    openSheet: openEditSelectedPrescriptionSheet,
  } = useSheet();

  const [suggestions] = useState([]);
  const [allowNotes, setAllowNotes] = useState(false);
  const [prescription, setPrescription] =
    useState<PrescriptionState>(initialState);

  const [prescriptionState, setPrescriptionState] = useState<
    PrescriptionState[]
  >([]);

  const {data: notesData} =
    useApiServicesAppMedicationGetpatientprescriptionsGetQuery({
      patientId: patientId,
    });

  const {data: dosageData} =
    useApiServicesAppMedicationGetmedicationsuggestionsGetQuery();

  const [CreateMedications, {isLoading}] =
    useApiServicesAppMedicationCreatemedicationPostMutation();

  const handleAddPrescription = useHandleAddPrescription({
    prescription,
    setPrescriptionState,
    setPrescription,
    prescriptionState,
  });
  const addItemToActivePills = useManageActivePills({
    prescription,
    setPrescription,
  });
  const isPrescriptionFormValid = usePrescriptionFormValidation({prescription});

  const onSave = useSavePrescription({
    CreateMedications,
    prescriptionState,
    setPrescriptionState,
    setPrescription,
    patientId,
  });

  const transformNotesData =
    notesData?.map(note => {
      const creationTime = note.creationTime ? note.creationTime : EMPTY_STRING;
      const description = note.note ? note.note : EMPTY_STRING;
      return {creationTime, description};
    }) ?? [];

  return (
    <>
      <AppSpacer direction="top" />
      <View style={styles.cardWrapper}>
        <AllInputSummaryList
          summaryData={transformNotesData}
          showDivider={false}
          ListHeaderComponent={
            <ScrollView showsVerticalScrollIndicator={false}>
              <AppText
                style={[styles.cardTitle, styles.marginLeftFive]}
                color="black"
                text={'Prescribe medication'}
              />
              <AppSpacer direction="bottom" size={12} />
              <View style={styles.line} />
              <AppSpacer direction="top" />
              {prescription?.activePills?.length === 0 ? (
                <PrescriptionSearchBarView
                  handleSelectedItem={addItemToActivePills}
                />
              ) : (
                <View style={button.buttonParent}>
                  <View style={button.searchItem}>
                    <AppText
                      color="text400"
                      text={prescription?.activePills[0]?.value}
                    />
                    <TouchableOpacity
                      style={button.closeButton}
                      onPress={() =>
                        setPrescription({
                          activePills: [],
                          dosage: null,
                          note: EMPTY_STRING,
                          direction: null,
                          frequency: null,
                          mainSearchResult: EMPTY_STRING,
                          duration: null,
                        })
                      }>
                      <CloseIcon fill={colors.text300} width={hp(16)} />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              <AppSpacer direction="top" />
              <AppText
                style={[styles.cardTitle, styles.marginLeftFive]}
                color="text300"
                text={'Suggested medications'}
              />
              <AppSpacer direction="bottom" size={12} />
              <AppPillsContainer
                suggestions={suggestions}
                setSuggestions={() => {}}
              />
              <AppSpacer direction="bottom" />
              {prescription?.activePills?.length > 0 ? (
                <>
                  <AppTextInputSelect
                    label="Dose & Unit"
                    placeholder={{
                      select: 'Select unit',
                      text: '0',
                    }}
                    selectOptions={dosageData?.unit?.map((u, index) => ({
                      item: {id: index, value: u, data: index},
                    }))}
                    value={{
                      select: prescription?.dosage?.label,
                      text: prescription?.dosage?.value,
                    }}
                    onChange={{
                      select: item => {
                        setPrescription({
                          ...prescription,
                          dosage: {
                            ...prescription.dosage,
                            value: prescription?.dosage?.value || EMPTY_STRING,
                            label: item?.value,
                          },
                        });
                      },
                      text: text => {
                        setPrescription({
                          ...prescription,
                          dosage: {
                            ...prescription.dosage,
                            value: text,
                            label: prescription?.dosage?.label || EMPTY_STRING,
                          },
                        });
                      },
                    }}
                  />
                  <AppSpacer direction="top" />
                  <View>
                    <AppTextInputSelect
                      label="Frequency"
                      placeholder={{
                        select: 'Select frequency',
                        text: '0',
                      }}
                      selectOptions={dosageData?.frequency?.map((u, index) => ({
                        item: {id: index, value: u, data: index},
                      }))}
                      value={{
                        select: prescription?.frequency?.label,
                        text: prescription?.frequency?.value,
                      }}
                      onChange={{
                        select: item => {
                          setPrescription({
                            ...prescription,
                            frequency: {
                              ...prescription.frequency,
                              value:
                                prescription?.frequency?.value || EMPTY_STRING,
                              label: item?.value,
                            },
                          });
                        },
                        text: text => {
                          setPrescription({
                            ...prescription,
                            frequency: {
                              ...prescription.frequency,
                              value: text,
                              label:
                                prescription?.frequency?.label || EMPTY_STRING,
                            },
                          });
                        },
                      }}
                    />
                    <AppSpacer direction="bottom" />
                  </View>

                  <View>
                    <AppTextInputSelect
                      label="Duration"
                      placeholder={{
                        select: 'Select interval',
                        text: '0',
                      }}
                      selectOptions={dosageData?.duration?.map((u, index) => ({
                        item: {id: index, value: u, data: index},
                      }))}
                      value={{
                        select: prescription?.duration?.label,
                        text: prescription?.duration?.value,
                      }}
                      onChange={{
                        select: item => {
                          setPrescription({
                            ...prescription,
                            duration: {
                              ...prescription.duration,
                              value:
                                prescription?.duration?.value || EMPTY_STRING,
                              label: item?.value,
                            },
                          });
                        },
                        text: text => {
                          setPrescription({
                            ...prescription,
                            duration: {
                              ...prescription.duration,
                              value: text,
                              label:
                                prescription?.duration?.label || EMPTY_STRING,
                            },
                          });
                        },
                      }}
                    />
                    <AppSpacer direction="bottom" />
                  </View>

                  <View>
                    <AppSelectInput
                      label="Directions"
                      placeholder="Select directions"
                      value={prescription.direction?.value}
                      onChange={item =>
                        setPrescription({
                          ...prescription,
                          direction: {
                            ...prescription.direction,
                            value: item.value,
                            label: item.value || EMPTY_STRING,
                          },
                        })
                      }
                      isOptionsLoading={false}
                      selectOptions={dosageData?.direction?.map((u, index) => ({
                        item: {id: index, value: u, data: index},
                      }))}
                    />

                    <AppSpacer direction="bottom" />
                  </View>
                  {allowNotes && (
                    <View>
                      <AppRow extraStyles={{justifyContent: 'flex-end'}}>
                        <Pressable onPress={() => setAllowNotes(!allowNotes)}>
                          <CloseCircledIcon fill={colors.text300} />
                        </Pressable>
                      </AppRow>
                      <AppSpacer direction="top" />
                      <AppTextInput
                        placeholder={'Type your notes here'}
                        multiline
                        numberOfLines={3}
                        height={64}
                        value={prescription?.note}
                        onChangeText={value => {
                          setPrescription({
                            ...prescription,
                            note: value,
                          });
                        }}
                      />
                      <AppSpacer direction="top" />
                    </View>
                  )}
                  {!allowNotes && (
                    <AppRow extraStyles={{justifyContent: 'flex-start'}}>
                      <Pressable onPress={() => setAllowNotes(!allowNotes)}>
                        <PlusCircleIcon fill={colors.primary400} />
                      </Pressable>
                      <AppText
                        style={[styles.cardTitle, styles.textUnderLine]}
                        type="paragraph_2_medium"
                        color={'primary400'}
                        text="Add prescription notes"
                        onPress={() => setAllowNotes(!allowNotes)}
                      />
                    </AppRow>
                  )}
                  <AppSpacer direction="top" />
                  <AppRow extraStyles={{justifyContent: 'flex-end'}}>
                    <Pressable onPress={handleAddPrescription}>
                      <PlusCircleIcon
                        fill={
                          isPrescriptionFormValid
                            ? colors.primary400
                            : colors.text50
                        }
                      />
                    </Pressable>
                    <AppText
                      style={[styles.cardTitle, styles.textUnderLine]}
                      type="paragraph_2_medium"
                      color={
                        isPrescriptionFormValid ? 'primary400' : 'primary50'
                      }
                      text="Add prescription"
                      onPress={handleAddPrescription}
                    />
                  </AppRow>
                  <AppSpacer direction="top" />
                </>
              ) : null}
              <AppSpacer direction="top" />
              {prescriptionState &&
                prescriptionState?.map((item: PrescriptionState, index) => (
                  <SelectedPrescriptionList
                    key={index}
                    item={item}
                    openEditSelectedPrescriptionSheet={
                      openEditSelectedPrescriptionSheet
                    }
                    editSelectedPrescriptionSheet={
                      editSelectedPrescriptionSheet
                    }
                    setPrescription={setPrescription}
                    setPrescriptionState={setPrescriptionState}
                    prescriptionState={prescriptionState}
                    index={index}
                  />
                ))}
              <AppSpacer direction="top" />
              <AppButton
                text="Save"
                isDisabled={prescriptionState?.length === 0}
                onPress={onSave}
                isLoading={isLoading}
              />
              <AppDivider />
            </ScrollView>
          }
        />
      </View>
    </>
  );
}
