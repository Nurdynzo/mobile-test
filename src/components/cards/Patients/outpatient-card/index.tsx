import {LandingListCardHeader} from '@/components/headers';
import {useNavigation} from '@react-navigation/native';
import dayjs from 'dayjs';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {ArrowRightIcon, RightCaretIcon, TickCircleIcon} from '@/assets/svg';
import {routesNames} from '@/navigation/routes';
import {doctorPatientStyle} from '@/screens/doctor/bottom-tabs/patients/styles';
import {GetPatientLandingListOuptDto} from '@/state/services/patientApi';
import {MenuOptionsProp} from '@/types/menusheet';
import {NavigationProps} from '@/types/navigation';
import {generateRandomPatientAndAppointmentIds} from '@/utils/helpers/generateRandomPatientAndAppointmentIds';
import {showToast} from '../../../app-toast';
import {AppText} from '../../../common';
import AppRow from '../../../common/app-row';
import {AppMenuSheet} from '../../../sheets';
import {RecordRow} from '../../index';
import {recordCardStyles} from '../../record-card/styles';
import {useRecordCard} from '../../record-card/useRecordCard';
import PatientInfoCard from '../patient-info-card';
import {PatientStatusLabel} from '../patient-status-label';

const OutpatientCard = ({
  showDoctorStatus = true,
  item,
}: {
  showDoctorStatus?: boolean;
  item?: GetPatientLandingListOuptDto;
}) => {
  const {detailsSheet, openDetailsSheet, colors, closeDetailsSheet} =
    useRecordCard();
  const navigation = useNavigation() as NavigationProps;
  const {patientId, appointmentId} = generateRandomPatientAndAppointmentIds();
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
        navigation.navigate(routesNames.DOCTOR.DOCTOR_ALL_INPUTS, {
          patientId,
          appointmentId,
        });
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
        {showDoctorStatus && (
          <LandingListCardHeader
            busyText={`${
              item?.attendingPhysician || 'Doctor'
            } is busy with patient`}
            hasInsurance
          />
        )}

        <PatientInfoCard
          dateOfBirth={item?.dateOfBirth}
          fullName={item?.name}
          code={item?.patientCode}
          gender={item?.gender}
          backgroundColor="transparent"
        />
        <View style={patient.cardContainer}>
          <View style={styles.leftPane}>
            <RecordRow detail="Appointment info">
              <AppText
                type="body_1_semibold"
                color="text400"
                text={`New Appointment | ${item?.appointmentType} | ${dayjs(
                  item?.startTime,
                ).format('HH:mm')}`}
              />
            </RecordRow>
            <RecordRow detail="Clinic">
              <AppText
                type="body_1_semibold"
                color="text400"
                text={item?.clinic || 'Neurology/Developmental Paedatrics'}
              />
            </RecordRow>

            <AppRow>
              <RecordRow detail="Status">
                <PatientStatusLabel
                  text={item?.status}
                  color="primary25"
                  bg="primary25"
                  icon={<TickCircleIcon />}
                />
              </RecordRow>

              <TouchableOpacity
                style={[styles.button, styles.successButton]}
                onPress={() => {
                  showToast('SUCCESS', {
                    title: 'Patient called successfully',
                    message: `${item?.name} has been called on the display successfully`,
                  });
                }}>
                <AppText
                  text="Call"
                  type="status_tag_semibold"
                  color={'white'}
                />
              </TouchableOpacity>
            </AppRow>
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

export default OutpatientCard;
