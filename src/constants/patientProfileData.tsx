import {
  CrossInCircleIcon,
  ListPaperIcon,
  MedicalFoldersIcon,
  PaymentIcon,
} from '@/assets/svg';
import {routesNames} from '@/navigation/routes';
import {ProfileNavCardProps} from '@/components/patient-profile-screen/types';
import React from 'react';

export const frontdeskPatientProfileData: ProfileNavCardProps<
  keyof Pick<
    ReactNavigation.RootParamList,
    | 'FD_PATIENT_OVERVIEW'
    | 'FD_PAYMENT_CONFIRMATION'
    | 'FD_WARD_ROUND_AND_CLINIC_NOTES'
    | 'FD_REVIEW_DETAILED_HISTORY'
  >
>[] = [
  {
    title: 'Patient Overview',
    Icon: <CrossInCircleIcon />,
    routeName: routesNames.FRONT_DESK.FD_PATIENT_OVERVIEW,
  },
  {
    title: 'Payment Confirmations',
    Icon: <PaymentIcon />,
    routeName: routesNames.FRONT_DESK.FD_PAYMENT_CONFIRMATION,
  },
  {
    title: 'Ward round & Clinic notes',
    Icon: <ListPaperIcon />,
    routeName: routesNames.FRONT_DESK.FD_WARD_ROUND_AND_CLINIC_NOTES,
  },
  {
    title: 'Review detailed history',
    Icon: <MedicalFoldersIcon />,
    routeName: routesNames.FRONT_DESK.FD_REVIEW_DETAILED_HISTORY,
  },
];
