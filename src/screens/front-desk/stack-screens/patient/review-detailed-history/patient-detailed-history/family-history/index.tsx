/* eslint-disable react/no-unstable-nested-components */
import {
  MinusCircleIcon,
  MoreVerticalIcon,
  PlusCircleIcon,
  UsersIcon,
} from '@/assets/svg';
import {AppButton} from '@/components/buttons';
import {LabelValueText} from '@/components/cards';
import {
  AppAlert,
  AppLoading,
  AppRow,
  AppSeperator,
  AppText,
} from '@/components/common';
import {FormFieldController} from '@/components/forms/form-field-controller';
import {
  AppButtonInput,
  AppTextInput,
  AppToggleSwitch,
} from '@/components/inputs';
import {RelationshipSelectInput} from '@/components/inputs/form-select-input';
import {AppContentSheet} from '@/components/sheets';
import {useColors} from '@/hooks/useColors';
import {useSheet} from '@/hooks/useSheet';
import {detectTouch} from '@/resources/config';
import {CreateOrEditPatientDto} from '@/state/services/patientApi';
import {
  InputFieldControls,
  ToggleSwitchFieldControls,
} from '@/types/formFieldsControls';
import {zodResolver} from '@hookform/resolvers/zod';
import React, {FunctionComponent} from 'react';
import {
  Control,
  FieldPath,
  useFieldArray,
  useForm,
  useWatch,
} from 'react-hook-form';
import {TouchableOpacity, View} from 'react-native';
import {
  AddMemberDetailsFormSchema,
  EditFamilyHistoryFormSchema,
  addMemberDetailsFormSchema,
} from './shema';
import {
  causeOfDeathFormStyles,
  deathCauseSearchInputStyles,
  familyHistoryStyles,
  familyKinInputStyles,
  familyMemberCardStyles,
  familyMemberFormSheetStyles,
} from './styles';

import AnimatedBubble from '@/components/animated-bubble';
import {SearchDiagnosesByTermInput} from '@/components/inputs/search';
import {SnowstormSimpleResponseDto} from '@/state/services/diagnosisApi';
import {BaseSheetProps} from '@/types/sheet';
import {EMPTY_STRING, NOT_AVAILABLE} from '@/utils/constants';
import {
  DetailedHistoryHeader,
  EditFormFieldsContainer,
  OptionsSheet,
} from '../common';
import {useFamilyHistory} from './useFamilyHistory';
import AlertBubbleIconWrapper from '@/components/alert-bubble-icon-wrapper';

const diagnosisByTerm = {
  id: EMPTY_STRING,
  name: EMPTY_STRING,
};

const FamilyHistory: FunctionComponent<{
  patientData: CreateOrEditPatientDto | undefined;
  onPressEdit?: () => void;
}> = ({onPressEdit, patientData}) => {
  const {colors} = useColors();
  const styles = familyHistoryStyles({colors});

  const familyDetails = {
    noOfSpouses: patientData?.numberOfSpouses ?? 0,
    positionInFamily: patientData?.positionInFamily,
    nuclearFamilySize: patientData?.nuclearFamilySize || 0,
    noOfMaleChildren: patientData?.noOfMaleChildren || 0,
    noOfFemaleChildren: patientData?.noOfFemaleChildren || 0,
    totalChildren:
      Number(patientData?.noOfMaleChildren || 0) +
      Number(patientData?.noOfFemaleChildren || 0),
    noOfMaleSiblings: patientData?.noOfMaleSiblings || 0,
    noOfFemaleSiblings: patientData?.noOfFemaleSiblings || 0,
    totalSiblings:
      Number(patientData?.noOfMaleSiblings || 0) +
      Number(patientData?.noOfFemaleSiblings || 0),
  };

  const isThereFamilyHistory =
    Object.values(familyDetails).some(el => !!el) ||
    patientData?.relations?.length;

  return (
    <View style={styles.container}>
      <DetailedHistoryHeader
        buttonTitle="Edit"
        onButtonPress={onPressEdit}
        title="Family history"
        lastEntered={
          isThereFamilyHistory
            ? {
                by: 'Mr Franklyn',
                day: '23 Nov 2023',
                time: '11: 23 PM',
              }
            : undefined
        }
      />
      {isThereFamilyHistory ? (
        <>
          <AppRow alignItems="flex-start">
            <LabelValueText
              label={'No. of spouses'}
              value={familyDetails.noOfSpouses}
            />
            <LabelValueText
              label={'Position in family'}
              value={familyDetails.positionInFamily ?? NOT_AVAILABLE}
            />
          </AppRow>
          <LabelValueText
            label={'Nuclear family size'}
            value={familyDetails.nuclearFamilySize}
          />
          <AppText
            text="Number of children"
            type="label_semibold"
            color="text300"
          />
          <AppRow alignItems="flex-end">
            <LabelValueText
              label={'No. of males'}
              value={familyDetails.noOfMaleChildren}
            />
            <LabelValueText
              label={'No. of females'}
              value={familyDetails.noOfFemaleChildren}
            />
            <LabelValueText
              label={'Total'}
              value={familyDetails.totalChildren}
            />
          </AppRow>
          <AppText
            text="Number of siblings"
            type="label_semibold"
            color="text300"
          />
          <AppRow alignItems="flex-end">
            <LabelValueText
              label={'No. of males'}
              value={familyDetails.noOfMaleSiblings}
            />
            <LabelValueText
              label={'No. of females'}
              value={familyDetails.noOfFemaleSiblings}
            />
            <LabelValueText
              label={'Total'}
              value={familyDetails.totalSiblings}
            />
          </AppRow>
          <AppSeperator />
          <AppText
            text="List of members"
            type="subtitle_semibold"
            color="text400"
          />
          <>
            {(patientData?.relations ?? [])?.map((el, index) => (
              <React.Fragment key={el.id}>
                <FamilyMemberCard
                  details={{
                    relationship: el.relationship,
                    isAlive: el.isAlive,
                    ageAtDeath: el.ageAtDeath
                      ? `${el.ageAtDeath}yrs`
                      : NOT_AVAILABLE,
                    ageAtDiagnosis: el.ageAtDiagnosis
                      ? `${el.ageAtDiagnosis}yrs`
                      : NOT_AVAILABLE,
                    causeOfDeath: (el?.diagnoses ?? [])
                      ?.filter(eItem => eItem.isCauseOfDeath)
                      .map(eItem => ({
                        id: eItem.sctId as string,
                        name: eItem.name as string,
                      })),
                    seriousIllnesses: (el?.diagnoses ?? [])
                      ?.filter(eItem => !eItem.isCauseOfDeath)
                      .map(eItem => ({
                        id: eItem.sctId as string,
                        name: eItem.name as string,
                      })),
                  }}
                  removeOptionsBtn
                />
                {index !== (patientData?.relations?.length ?? 1) - 1 && (
                  <AppSeperator />
                )}
              </React.Fragment>
            ))}
          </>
        </>
      ) : (
        <AppAlert
          title="Family History"
          description="No family history has been saved"
          showButton={false}
          icon={
            <AnimatedBubble
              bgColor="primary25"
              size={90}
              Icon={
                <AlertBubbleIconWrapper
                  icon={
                    <UsersIcon fill={colors.white} width={36} height={36} />
                  }
                />
              }
            />
          }
        />
      )}
    </View>
  );
};

const FamilyHistoryEdit: FunctionComponent<{
  patientData: CreateOrEditPatientDto | undefined;
  onClose?: () => void;
}> = props => {
  const {colors} = useColors();
  const styles = familyHistoryStyles({colors});

  const {closeSheet, openSheet, sheetRef} = useSheet();

  const {_handleSubmit, control, isLoading} = useFamilyHistory(props);

  return (
    <View style={[styles.container, styles.editContainer]}>
      <AppLoading isLoading={isLoading} />
      <DetailedHistoryHeader
        buttonTitle="Done"
        onButtonPress={_handleSubmit}
        title="Family history"
      />
      <EditFormFieldsContainer>
        <FormFieldController
          name="isFamilyHistoryNotKnown"
          control={control}
          Field={({onChange, value}: ToggleSwitchFieldControls) => {
            return (
              <AppToggleSwitch
                isOn={value}
                labelPosition="left"
                onColor={'primary400'}
                label="Family history not known"
                useNativeDriver={true}
                offColor="neutral100"
                onToggle={isOn => onChange(isOn)}
              />
            );
          }}
        />
        <AppText text="Number of siblings" type="subtitle_semibold" />
        <FamilyKinsInput
          control={control}
          names={{
            numOfFemales: 'noOfFemaleSiblings',
            numOfMales: 'noOfMaleSiblings',
          }}
        />
        <AppText text="Number of children" type="subtitle_semibold" />
        <FamilyKinsInput
          control={control}
          names={{
            numOfFemales: 'noOfFemaleChildren',
            numOfMales: 'noOfMaleChildren',
          }}
        />
        <View style={styles.addViewContainer}>
          <AppText text="List of family members" />
          <AppButton
            onPress={openSheet}
            text={'Add new'}
            buttonColor="white"
            borderColor="primary400"
            textColor="primary400"
            borderWidth={1}
            LeftContent={<PlusCircleIcon fill={colors.primary400} />}
            containerStyle={styles.btn}
          />
        </View>
        <AppSeperator />
        <FamilyMemberList control={control} />
      </EditFormFieldsContainer>
      <FamilyMemberDetailsFormSheet
        headerTitle="Add member details"
        closeSheet={closeSheet}
        sheetRef={sheetRef}
        submitBtnTitle={'Save'}
      />
    </View>
  );
};

export {FamilyHistory, FamilyHistoryEdit};

const FamilyMemberList: FunctionComponent<{
  control: Control<EditFamilyHistoryFormSchema>;
}> = ({control}) => {
  const {fields} = useFieldArray({control, name: 'members'});
  const {colors} = useColors();
  const styles = familyHistoryStyles({colors});
  return (
    <View style={styles.memberListContainer}>
      {fields.map((el, index) => (
        <React.Fragment key={el.id}>
          <FamilyMemberCard
            details={{
              ageAtDeath: el.ageOfDeath as string,
              ageAtDiagnosis: el.ageAtDiagnosis as string,
              isAlive: el.isAlive,
              causeOfDeath: el.causeOfDeath,
              seriousIllnesses: el.seriousIllnesses,
              relationship: el.relationship as string,
            }}
          />
          {index !== (fields?.length ?? 1) - 1 && <AppSeperator />}
        </React.Fragment>
      ))}
    </View>
  );
};

const FamilyMemberCard: FunctionComponent<{
  removeOptionsBtn?: boolean;
  details?: {
    relationship: string;
    isAlive: boolean | undefined;
    ageAtDeath: string;
    ageAtDiagnosis: string;
    causeOfDeath: {id: string; name: string}[];
    seriousIllnesses: {id: string; name: string}[];
  };
}> = ({removeOptionsBtn, details}) => {
  const styles = familyMemberCardStyles;
  const {
    closeSheet: closeOptionsSheet,
    openSheet: openOptionsSheet,
    sheetRef: optionsSheetRef,
  } = useSheet();
  const {
    closeSheet: closeEditMemberSheet,
    openSheet: openEditMemberSheet,
    sheetRef: editMemberSheetRef,
  } = useSheet();

  return (
    <View>
      <View style={styles.container}>
        <AppRow alignItems="flex-start">
          <LabelValueText
            label={'Member'}
            value={details?.relationship ?? NOT_AVAILABLE}
          />
          <LabelValueText
            label={'Alive'}
            value={
              typeof details?.isAlive === 'boolean'
                ? details?.isAlive
                  ? 'Yes'
                  : 'No'
                : NOT_AVAILABLE
            }
          />
        </AppRow>
        <AppRow alignItems="flex-start">
          <LabelValueText
            label={'Age at death'}
            value={details?.ageAtDeath ?? NOT_AVAILABLE}
          />
          <LabelValueText
            label={'Cause at death'}
            value={
              details?.causeOfDeath.map(item => item?.name).join(', ') ||
              NOT_AVAILABLE
            }
          />
        </AppRow>
        <AppRow alignItems="flex-start">
          <LabelValueText
            label={'Serious illnesses'}
            value={
              details?.seriousIllnesses.map(item => item?.name).join(', ') ||
              NOT_AVAILABLE
            }
          />
          <LabelValueText
            label={'Age at diagnosis'}
            value={details?.ageAtDiagnosis ?? NOT_AVAILABLE}
          />
        </AppRow>
      </View>
      {!removeOptionsBtn && (
        <TouchableOpacity
          onPress={openOptionsSheet}
          hitSlop={detectTouch}
          style={styles.optionBtn}>
          <MoreVerticalIcon />
        </TouchableOpacity>
      )}
      <OptionsSheet
        closeSheet={closeOptionsSheet}
        sheetRef={optionsSheetRef}
        onDeletePress={() => null}
        onEditPress={openEditMemberSheet}
      />
      <FamilyMemberDetailsFormSheet
        headerTitle="Edit member details"
        sheetRef={editMemberSheetRef}
        closeSheet={closeEditMemberSheet}
        defaultValues={details}
        submitBtnTitle={'Update'}
      />
    </View>
  );
};

export const FamilyKinsInput: FunctionComponent<{
  control: Control<EditFamilyHistoryFormSchema>;
  names: {
    numOfMales: FieldPath<EditFamilyHistoryFormSchema>;
    numOfFemales: FieldPath<EditFamilyHistoryFormSchema>;
  };
}> = ({control, names}) => {
  const numOfFemales = useWatch({control, name: names.numOfFemales});
  const numOfMales = useWatch({control, name: names.numOfMales});
  const styles = familyKinInputStyles;

  return (
    <View style={styles.container}>
      <FormFieldController
        name={names.numOfFemales}
        control={control}
        containerStyle={styles.flex1}
        Field={({onChange, value}: InputFieldControls) => {
          return (
            <AppTextInput
              label="No. of females"
              placeholder="0"
              onChangeText={onChange}
              value={value}
            />
          );
        }}
      />
      <FormFieldController
        name={names.numOfMales}
        control={control}
        containerStyle={styles.flex1}
        Field={({onChange, value}: InputFieldControls) => {
          return (
            <AppTextInput
              label="No. of males"
              placeholder="0"
              onChangeText={onChange}
              value={value}
            />
          );
        }}
      />
      <AppButtonInput
        disabled
        label="Total"
        placeholder="0"
        value={`${Number(numOfFemales ?? 0) + Number(numOfMales ?? 0)}`}
        style={styles.btnInput}
      />
    </View>
  );
};

const FamilyMemberDetailsFormSheet: FunctionComponent<
  {
    defaultValues?: AddMemberDetailsFormSchema;
    onSubmit?: (props: {
      values: AddMemberDetailsFormSchema;
      reset: () => void;
    }) => void;
    headerTitle: string;
    submitBtnTitle: string;
  } & BaseSheetProps
> = ({
  closeSheet,
  sheetRef,
  defaultValues,
  onSubmit = () => null,
  headerTitle,
  submitBtnTitle,
}) => {
  const styles = familyMemberFormSheetStyles;
  const {control, handleSubmit, reset, watch} =
    useForm<AddMemberDetailsFormSchema>({
      defaultValues: {
        ...defaultValues,
        causeOfDeath: defaultValues?.causeOfDeath.length
          ? defaultValues?.causeOfDeath
          : [diagnosisByTerm],
        seriousIllnesses: defaultValues?.seriousIllnesses.length
          ? defaultValues?.seriousIllnesses
          : [diagnosisByTerm],
      },
      resolver: zodResolver(addMemberDetailsFormSchema),
      mode: 'onSubmit',
      reValidateMode: 'onChange',
    });

  return (
    <AppContentSheet
      headerTitle={headerTitle}
      closeSheet={closeSheet}
      onClose={reset}
      FooterComponent={
        <View style={styles.footerContainer}>
          <AppButton
            text={submitBtnTitle}
            onPress={handleSubmit(values => onSubmit({values, reset}))}
          />
        </View>
      }
      sheetRef={sheetRef}>
      <View style={styles.container}>
        <RelationshipSelectInput control={control} name="relationship" />
        <FormFieldController
          name="ageOfDeath"
          control={control}
          Field={({onChange, value}: InputFieldControls) => {
            return (
              <AppTextInput
                label="Age at death"
                placeholder="0"
                onChangeText={onChange}
                value={value}
                RightContent={
                  <AppText text="yrs" type="body_1_medium" color="text300" />
                }
              />
            );
          }}
        />
        <FormFieldController
          name="isAlive"
          control={control}
          Field={({onChange, value}: ToggleSwitchFieldControls) => {
            return (
              <AppToggleSwitch
                isOn={value}
                labelPosition="left"
                onColor={'primary400'}
                label="Alive"
                useNativeDriver={true}
                offColor="neutral100"
                onToggle={isOn => onChange(isOn)}
              />
            );
          }}
        />
        <DiagnosisByTermForm
          control={control}
          name="causeOfDeath"
          label="Cause of death"
          placeholder="Search cause"
          disable={watch('isAlive')}
        />
        <DiagnosisByTermForm
          control={control}
          name="seriousIllnesses"
          label="Serious illnesses (if any)"
          placeholder="Search illness"
        />

        <FormFieldController
          name="ageAtDiagnosis"
          control={control}
          Field={({onChange, value}: InputFieldControls) => {
            return (
              <AppTextInput
                label="Age at Diagnosis"
                placeholder="0"
                onChangeText={onChange}
                value={value}
                RightContent={
                  <AppText text="yrs" type="body_1_medium" color="text300" />
                }
              />
            );
          }}
        />
      </View>
    </AppContentSheet>
  );
};

export const DiagnosisByTermForm: FunctionComponent<{
  control: Control<AddMemberDetailsFormSchema>;
  name: 'causeOfDeath' | 'seriousIllnesses';
  label?: string;
  placeholder?: string;
  disable?: boolean;
}> = ({control, name, label, placeholder, disable}) => {
  const {fields, remove, insert} = useFieldArray({
    control,
    name,
  });
  const styles = causeOfDeathFormStyles;
  return (
    <View style={styles.container}>
      <AppText text={label} type="label_semibold" color="text300" />
      <View style={styles.fieldsContainer}>
        {fields.map((field, index) => {
          const nameRef = `${name}.${index}` as const;
          return (
            <FormFieldController
              key={field.id}
              name={nameRef}
              control={control}
              Field={({onChange, value}) => {
                return (
                  <DiagnosisByTermSearchInput
                    onChange={onChange}
                    placeholder={placeholder}
                    disable={disable}
                    value={value}
                    onAddPress={() => insert(index + 1, diagnosisByTerm)}
                    onMinusPress={() => remove(index)}
                    type={index === fields.length - 1 ? 'add' : 'remove'}
                  />
                );
              }}
            />
          );
        })}
      </View>
    </View>
  );
};

const DiagnosisByTermSearchInput: FunctionComponent<{
  value: {id: number; name: string};
  onChange?: (item: SnowstormSimpleResponseDto) => void;
  disable?: boolean;
  isLoadingDetails?: boolean;
  onAddPress?: () => void;
  onMinusPress?: () => void;
  type: 'add' | 'remove';
  placeholder?: string;
}> = ({
  value,
  onChange = () => null,
  disable,
  isLoadingDetails,
  type,
  placeholder,
  onAddPress,
  onMinusPress,
}) => {
  const {colors} = useColors();
  const styles = deathCauseSearchInputStyles;

  return (
    <View style={styles.container}>
      <View style={styles.btnInput}>
        <SearchDiagnosesByTermInput
          placeholder={placeholder}
          onSelectedItem={onChange}
          isLoading={isLoadingDetails}
          value={value.name}
        />
      </View>
      <TouchableOpacity
        hitSlop={detectTouch}
        disabled={disable}
        onPress={type === 'add' ? onAddPress : onMinusPress}>
        {type === 'add' ? (
          <PlusCircleIcon fill={colors[disable ? 'primary50' : 'primary400']} />
        ) : (
          <MinusCircleIcon fill={colors[disable ? 'primary50' : 'danger300']} />
        )}
      </TouchableOpacity>
    </View>
  );
};
