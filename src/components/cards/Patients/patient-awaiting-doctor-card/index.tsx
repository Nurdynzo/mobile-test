import {ArrowRightIcon, RightCaretIcon} from '@/assets/svg';
import {AppButton} from '@/components/buttons';
import {AppointmentStatus} from '@/components/cards/statues';
import {AppRow, AppText} from '@/components/common';
import {LandingListCardHeader} from '@/components/headers';
import {AppContentSheet, AppMenuSheet} from '@/components/sheets';
import AppSelectItemSheet from '@/components/sheets/app-select-item-sheet';
import {useColors} from '@/hooks/useColors';
import {useSheet} from '@/hooks/useSheet';
import {routesNames} from '@/navigation/routes';
import {MenuOptionsProp} from '@/types/menusheet';
import {NavigationProps} from '@/types/navigation';
import {NOT_AVAILABLE} from '@/utils/constants';
import {generateRandomPatientAndAppointmentIds} from '@/utils/helpers/generateRandomPatientAndAppointmentIds';
import {useNavigation} from '@react-navigation/native';
import React, {FunctionComponent} from 'react';
import {Pressable, View} from 'react-native';
import LabelValueText from '../../../common/label-value-text';
import RecordRow from '../../record-row';
import PatientInfoCard from '../patient-info-card';
import {
  fullCardDetailsSheetStyles,
  patientAwaitingDoctorCardStyles,
} from './styles';
import {
  FullCardDetailsSheetProps,
  PatientAwaitingDoctorCardProps,
} from './types';

const PatientAwaitingDoctorCard: FunctionComponent<
  PatientAwaitingDoctorCardProps
> = ({
  isBusyWithPhysician = true,
  data,
  avatar,
  mostRecentVitals,
  diagnosis,
}) => {
  const {colors} = useColors();

  const styles = patientAwaitingDoctorCardStyles({colors});

  const {
    closeSheet: closeDetailsSheet,
    openSheet: openDetailsSheet,
    sheetRef: detailsSheet,
  } = useSheet();
  const {
    sheetRef: patientFullDetailsSheetRef,
    closeSheet: closePatientFullDetailsSheet,
    openSheet: openPatientFullDetailsSheet,
  } = useSheet();
  const {
    sheetRef: assignToSheetRef,
    closeSheet: closeAssignToSheet,
    openSheet: openAssignToSheet,
  } = useSheet();

  const navigation = useNavigation() as NavigationProps;
  const {appointmentId} = generateRandomPatientAndAppointmentIds();

  const detailsOptions: MenuOptionsProp = [
    {
      value: 'View full card details',
      onPress: openPatientFullDetailsSheet,
    },
    {
      value: 'Reassign patient',
      onPress: openAssignToSheet,
    },
    {
      value: 'View all inputs',
      onPress: () =>
        navigation.navigate(
          routesNames.NURSE.IN_PATIENT_NURSE_ALL_INPUT_LANDING_DASHBOARD,
          {patientId: data.patientId as number, appointmentId},
        ),
    },
    {
      value: 'View referral letter',
      onPress: () => null,
    },
    {
      value: 'View patient profile',
      onPress: () => null,
    },
  ];
  return (
    <>
      <View style={styles.wrapper}>
        {isBusyWithPhysician && (
          <LandingListCardHeader
            busyText={`${data?.attendingPhysician} is busy with patient`}
            hasInsurance
          />
        )}

        <PatientInfoCard
          fullName={data?.name || NOT_AVAILABLE}
          dateOfBirth={data?.dateOfBirth}
          code={data.patientCode || NOT_AVAILABLE}
          gender={data?.gender || NOT_AVAILABLE}
          avatar={avatar}
          backgroundColor="transparent"
        />
        <View style={styles.cardContainer}>
          <AppRow alignItems="flex-start">
            <LabelValueText
              label={'Clinic'}
              value={data?.clinic ?? NOT_AVAILABLE}
            />
            <LabelValueText
              label={'Appointment type'}
              value={data?.appointmentType ?? NOT_AVAILABLE}
            />
          </AppRow>
          <AppRow alignItems="flex-start">
            <RecordRow detail="Status">
              <AppointmentStatus status={data?.status} />
            </RecordRow>
            <LabelValueText
              label={'Assigned to'}
              value={data?.attendingPhysician ?? NOT_AVAILABLE}
            />
          </AppRow>
        </View>
        <Pressable onPress={openDetailsSheet} style={styles.bottomPane}>
          <AppRow>
            <AppText
              color="primary400"
              type="button_semibold"
              text="View details"
            />
            <ArrowRightIcon />
          </AppRow>
        </Pressable>
      </View>

      <AppMenuSheet
        menuOptions={detailsOptions}
        removeHeader
        sheetRef={detailsSheet}
        closeSheet={closeDetailsSheet}
        renderRightIcon={() => <RightCaretIcon />}
      />
      <FullCardDetailsSheet
        sheetRef={patientFullDetailsSheetRef}
        closeSheet={closePatientFullDetailsSheet}
        details={{
          data,
          avatar,
          mostRecentVitals,
          diagnosis,
        }}
      />
      <AppSelectItemSheet
        title="Assign to"
        sheetRef={assignToSheetRef}
        selectOptions={[]}
        FooterComponent={
          <View style={styles.asssignToSheetFooterContiner}>
            <AppButton text="Assign" onPress={closeAssignToSheet} />
          </View>
        }
      />
    </>
  );
};

export default PatientAwaitingDoctorCard;

const FullCardDetailsSheet: FunctionComponent<FullCardDetailsSheetProps> = ({
  details,
  closeSheet,
  sheetRef,
}) => {
  const {data, avatar, mostRecentVitals, diagnosis} = details;
  const styles = fullCardDetailsSheetStyles;
  return (
    <AppContentSheet
      headerTitle="Full card details"
      sheetRef={sheetRef}
      containerStyle={styles.container}
      closeSheet={closeSheet}>
      <PatientInfoCard
        fullName={data?.name || NOT_AVAILABLE}
        dateOfBirth={data?.dateOfBirth}
        code={data?.patientCode || NOT_AVAILABLE}
        gender={data?.gender || NOT_AVAILABLE}
        avatar={avatar}
      />

      <AppRow alignItems="flex-start">
        <LabelValueText
          label={'Clinic'}
          value={data?.clinic ?? NOT_AVAILABLE}
        />
        <LabelValueText
          label={'Appointment type'}
          value={data?.appointmentType ?? NOT_AVAILABLE}
        />
      </AppRow>
      <AppRow alignItems="flex-start">
        <RecordRow detail="Status">
          <AppointmentStatus status={data?.status} />
        </RecordRow>
        <LabelValueText
          label={'Assigned to'}
          value={data?.attendingPhysician ?? NOT_AVAILABLE}
        />
      </AppRow>
      <LabelValueText
        label={'Most recent vitals'}
        value={mostRecentVitals ?? NOT_AVAILABLE}
      />
      <LabelValueText label={'Diagnosis'} value={diagnosis ?? NOT_AVAILABLE} />
    </AppContentSheet>
  );
};
