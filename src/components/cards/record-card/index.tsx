import {
  DoubleCaretRightCircleIcon,
  ExclaimationIcon,
  HealthIcon,
  HeartIcon,
  MinusIcon,
  RightCaretIcon,
  ScanIcon,
  TickCircleIcon,
} from '@/assets/svg';
import {MenuOptionsProp} from '@/types/menusheet';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {AppText} from '../../common';
import AppRow from '../../common/app-row';
import {AppMenuSheet, AppSheet} from '../../sheets';
import AppContentSheet from '../../sheets/app-content-sheet';
import {recordCardStyles} from './styles';
import {RecordCardProps} from './type';
import {detailsType, useRecordCard} from './useRecordCard';
import {routesNames} from '@/navigation/routes';
import {GeneralNavProp} from '@/navigation/types';
import {NOT_AVAILABLE, TEMP_AVATAR_URL} from '@/utils/index';
import {useNavigation} from '@react-navigation/native';
import PatientInfoCard from '../Patients/patient-info-card';
import {
  InsuranceDetails,
  IsPatientNewCard,
  NextOfKinDetailsView,
  PaperRecordStatus,
  RecordRow,
  StatusLabel,
} from '../index';
import {ColorDefinitions} from '@/resources/colors';
import {updateSelectedPatient} from '@/state/slices/patient/selectedPatient';
import {useDispatch} from 'react-redux';
// TODO(Zucci): Kindly review this shouldn't be here
export type customOptionType = {
  title: detailsType;
  action?: () => void;
  id?: string;
};

// TODO(Philip): This component needs to be improved
const RecordCard = ({
  appointmentDate = NOT_AVAILABLE,
  appointmentTime = NOT_AVAILABLE,
  clinicName = NOT_AVAILABLE,
  appointmentTitle,
  appointmentType,
  appointmentId,
  status,
  patient,
}: RecordCardProps) => {
  const dispatch = useDispatch();

  const onMenuOptionChanged = () => {
    dispatch(
      updateSelectedPatient({
        id: patient?.id || 0,
        fullName: patient?.fullName ?? NOT_AVAILABLE,
        code: patient?.patientCode ?? NOT_AVAILABLE,
        dateOfBirth: patient?.dateOfBirth ?? NOT_AVAILABLE,
        gender: patient?.genderType ?? NOT_AVAILABLE,
        pic: patient?.pictureUrl ?? TEMP_AVATAR_URL,
      }),
    );
  };

  const {
    detailsSheet,
    generalSheet,
    closeDetailsSheet,
    paperRecordStatusSheet,
    openPaperRecordStatusSheet,
    openDetailsSheet,
    currentlyViewing,
    handleCurrentlyViewing,
    colors,
  } = useRecordCard();
  const navigation = useNavigation<GeneralNavProp>();

  const styles = recordCardStyles({colors});

  const detailsOptions: MenuOptionsProp = [
    {
      id: '1',
      value: 'Create invoice',
      onPress: () =>
        navigation.navigate(routesNames.FRONT_DESK.FD_CREATE_INVOICE, {
          appointment: {
            id: appointmentId,
            title: appointmentTitle,
            type: appointmentType,
            time: appointmentTime,
          },
          patientId: patient?.id || 0,
        }),
    },
    {
      id: '2',
      value: 'Create appointment',
      onPress: () =>
        navigation.navigate(routesNames.FRONT_DESK.FD_ADD_NEW_APPOINTMENT, {
          patientId: patient.id || 0,
        }),
    },
    {
      id: '3',
      value: 'View appointment info',
      onPress: () =>
        navigation.navigate(routesNames.FRONT_DESK.FD_VIEW_APPOINTMENT_INFO),
    },
    {
      id: '4',
      value: 'Scan paper records',
      onPress: () =>
        navigation.navigate(routesNames.FRONT_DESK.FD_SCAN_PAPER_RECORDS),
    },
    {
      id: '5',
      value: 'View patient profile',
      onPress: () =>
        navigation.navigate(routesNames.FRONT_DESK.FD_PATIENT_PROFILE),
    },
    {
      id: '6',
      value: 'View Next of Kin',
      onPress: () => handleCurrentlyViewing('View Next of Kin'),
    },
    {
      id: '7',
      value: 'Add demographic info',
      onPress: () =>
        navigation.navigate(routesNames.FRONT_DESK.FD_ADD_DEMOGRAPHIC_INFO),
    },
  ];

  const renderContent = () => {
    switch (currentlyViewing) {
      case 'View Next of Kin':
        return <NextOfKinDetailsView />;
      case 'View insurance details':
        return <InsuranceDetails />;
      default:
        return null;
    }
  };

  return (
    <>
      <View style={styles.wrapper}>
        {false && (
          <View style={styles.topPane}>
            <MinusIcon />
            <AppText
              color="text400"
              type="status_tag_semibold"
              text={appointmentTitle}
            />
          </View>
        )}
        <PatientInfoCard
          StatusContent={patient.isNewToHospital && <IsPatientNewCard />}
          dateOfBirth={patient.dateOfBirth}
          avatar={patient.pictureUrl}
          gender={patient.genderType}
          fullName={patient.fullName}
          code={patient.patientCode}
          backgroundColor="transparent"
        />
        <View style={styles.generalRowWrapper}>
          <View style={[styles.generalRowContainer, styles.card]}>
            <AppRow alignItems="flex-start">
              <RecordRow
                detail="Clinic"
                icon={
                  <TouchableOpacity onPress={openPaperRecordStatusSheet}>
                    <ScanIcon />
                  </TouchableOpacity>
                }>
                <AppText
                  type="body_1_semibold"
                  color="text400"
                  text={clinicName}
                />
              </RecordRow>
              <RecordRow detail="Wallet bal. (₦)">
                <AppText
                  color="text400"
                  type="body_1_semibold"
                  text={NOT_AVAILABLE}
                />
              </RecordRow>
            </AppRow>
            <AppRow alignItems="flex-start">
              <RecordRow detail="Status">
                {RenderStatusLabel({status, colors}).element}
              </RecordRow>
              <RecordRow detail="Time/Date">
                <AppText
                  color={'text400'}
                  type="body_1_semibold"
                  text={`${appointmentDate}`}
                />
                <AppText
                  color={'text400'}
                  type="body_1_semibold"
                  text={`${appointmentTime}`}
                />
              </RecordRow>
            </AppRow>
          </View>
        </View>
        <TouchableOpacity onPress={openDetailsSheet} style={styles.bottomPane}>
          <AppRow alignItems="flex-start">
            <AppText
              color="primary400"
              type="button_semibold"
              text="View details "
            />
            <RightCaretIcon stroke={colors.primary400} />
          </AppRow>
        </TouchableOpacity>
      </View>

      <AppMenuSheet
        menuOptions={detailsOptions}
        closeSheet={closeDetailsSheet}
        removeHeader
        sheetRef={detailsSheet}
        onChanged={() => {
          onMenuOptionChanged();
        }}
        renderRightIcon={() => <RightCaretIcon stroke={colors.text400} />}
      />

      <AppSheet adjustToContentHeight sheetRef={paperRecordStatusSheet}>
        <PaperRecordStatus />
      </AppSheet>
      <AppContentSheet
        headerTitle={currentlyViewing}
        sheetRef={generalSheet}
        contentHeight={487}>
        {renderContent()}
      </AppContentSheet>
    </>
  );
};

export default RecordCard;

const RenderStatusLabel = ({
  status,
  colors,
}: {
  status?: string;
  colors: ColorDefinitions;
}) => {
  switch (status) {
    case 'Review scan':
      return {
        element: (
          <StatusLabel
            text={status}
            color="alert500"
            bg={'alert25'}
            icon={<ExclaimationIcon fill={colors.alert500} />}
          />
        ),
        color: 'alert500',
      };
    case 'Rejected Scan':
      return {
        element: (
          <StatusLabel
            text={status}
            color="danger300"
            bg={'danger25'}
            icon={<ExclaimationIcon fill={colors.danger300} />}
          />
        ),
        color: 'danger300',
      };
    case 'Not arrived':
      return {
        element: (
          <StatusLabel
            text={status}
            color="danger300"
            bg={'danger25'}
            icon={<ExclaimationIcon fill={colors.danger300} />}
          />
        ),
        color: 'danger300',
      };
    case 'Processing':
      return {
        element: (
          <StatusLabel
            text={status}
            color="alert500"
            bg={'alert25'}
            icon={<DoubleCaretRightCircleIcon />}
          />
        ),
        color: 'alert500',
      };
    case 'Awaiting vitals':
      return {
        element: (
          <StatusLabel
            text={status}
            color="waiting400"
            bg={'waiting25'}
            icon={<HeartIcon fill={colors.waiting400} />}
          />
        ),
        color: 'waiting400',
      };
    case 'Awaiting doctor':
      return {
        color: 'primary400',
        element: (
          <StatusLabel
            text={status}
            color="primary400"
            bg={'primary25'}
            icon={<HeartIcon fill={colors.primary400} />}
          />
        ),
      };
    case 'Transferred to ward':
      return {
        color: 'waiting400',
        element: (
          <StatusLabel
            text={status}
            color="waiting400"
            bg={'waiting25'}
            icon={<HealthIcon fill={colors.waiting400} />}
          />
        ),
      };
    case 'Admitted to ward':
      return {
        color: 'secondary400',
        element: (
          <StatusLabel
            text={status}
            color="secondary400"
            bg={'secondary25'}
            icon={<HealthIcon fill={colors.secondary400} />}
          />
        ),
      };
    case 'Seen doctor':
      return {
        color: 'success600',
        element: (
          <StatusLabel
            text={status}
            color="success600"
            bg={'success25'}
            icon={<TickCircleIcon />}
          />
        ),
      };

    default:
      return {
        color: 'transparent',
        element: (
          <StatusLabel
            text={NOT_AVAILABLE}
            color="transparent"
            bg={'transparent'}
          />
        ),
      };
  }
};
