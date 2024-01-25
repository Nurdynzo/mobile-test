import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {
  ArrowRightIcon,
  HeartIcon,
  MinusIcon,
  RightCaretIcon,
} from '@/assets/svg';
import {routesNames} from '@/navigation/routes';
import {doctorPatientStyle} from '@/screens/doctor/bottom-tabs/patients/styles';
import {PatientDetails} from '@/types/doctor/nurseDoctor';
import {MenuOptionsProp} from '@/types/menusheet';
import {NavigationProps} from '@/types/navigation';
import {AppText} from '../../../common';
import AppRow from '../../../common/app-row';
import {AppMenuSheet} from '../../../sheets';
import {RecordRow} from '../../index';
import {recordCardStyles} from '../../record-card/styles';
import {useRecordCard} from '../../record-card/useRecordCard';
import PatientInfoCard from '../patient-info-card';
import {PatientStatusLabel} from '../patient-status-label';

const InpatientAECard = ({
  showDoctorStatus = true,
  item,
}: {
  showDoctorStatus?: boolean;
  item?: PatientDetails;
}) => {
  const navigation = useNavigation() as NavigationProps;
  const {detailsSheet, openDetailsSheet, colors, closeDetailsSheet} =
    useRecordCard();
  const styles = recordCardStyles({colors});
  const patient = doctorPatientStyle({colors});
  const detailsOptions: MenuOptionsProp = [
    {
      value: 'Reassign patient',
      onPress: () => null,
      id: 'option-1',
    },
    {
      value: 'View all inputs',
      onPress: () => {
        closeDetailsSheet();
        navigation.navigate(routesNames.DOCTOR.DOCTOR_ALL_INPUTS);
      },
      id: 'option-2',
    },
    {
      value: 'Call patient',
      onPress: () => null,
      id: 'option-3',
    },
    {
      value: 'View referral letter',
      onPress: () => null,
      id: 'option-4',
    },
    {
      value: 'View patient profile',
      onPress: () => null,
      id: 'option-5',
    },
  ];

  return (
    <>
      <View style={patient.wrapper}>
        {showDoctorStatus ? (
          <View style={styles.topPane}>
            <MinusIcon />
            <AppText
              color="text400"
              type="status_tag_semibold"
              text={`${item?.managingDoctor || 'Doctor'} is busy with patient`}
            />
          </View>
        ) : null}

        <PatientInfoCard
          fullName={`${item?.name?.firstName} ${item?.name?.lastName}`}
          code={item?.patientId}
          gender={item?.gender}
          backgroundColor="transparent"
        />

        <View style={patient.cardContainer}>
          <View style={styles.leftPane}>
            <View style={patient.rowSpaceBetween}>
              <RecordRow detail="Status">
                <PatientStatusLabel
                  text={item?.status}
                  color="primary25"
                  bg="primary25"
                  icon={<HeartIcon />}
                />
              </RecordRow>

              <View style={styles.row}>
                <AppText
                  type="body_1_semibold"
                  color="text300"
                  text="Bed No."
                />
                <AppText
                  type="body_1_semibold"
                  color="text400"
                  text={`${item?.bed}`}
                />
              </View>
            </View>

            <RecordRow detail="Most recent vitals">
              <AppText
                type="body_1_semibold"
                color="text400"
                text={`${item?.vitals.join(', ')}`}
              />
            </RecordRow>

            <RecordRow detail="Managing unit">
              <AppText
                type="body_1_semibold"
                color="text400"
                text={`${item?.unit}`}
              />
            </RecordRow>
          </View>
        </View>
        <TouchableOpacity onPress={openDetailsSheet} style={styles.bottomPane}>
          <AppRow>
            <AppText
              color="primary400"
              type="button_semibold"
              text="View details"
            />
            <ArrowRightIcon />
          </AppRow>
        </TouchableOpacity>
      </View>

      <AppMenuSheet
        menuOptions={detailsOptions}
        removeHeader
        sheetRef={detailsSheet}
        renderRightIcon={() => <RightCaretIcon />}
      />
    </>
  );
};

export default InpatientAECard;
