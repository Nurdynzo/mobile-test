import {
  AllInputs,
  Diagnosis,
  PrescriptionScreen,
  PresentingComplaintsScreen,
  Procedures,
} from '@/screens/doctor';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {routesNames} from '../../routes';
import DoctorBottomTab from '../bottom-tab';

export type DoctorRootStackParamList = {
  DOCTOR_ROOT_NAVIGATION: undefined;
  DOCTOR_BOTTOM_TAB: undefined;
  DOCTOR_PATIENTS: undefined;
  DOCTOR_ALL_PATIENTS: undefined;
  DOCTOR_MESSAGES: undefined;
  DOCTOR_NOTIFICATIONS: undefined;
  DOCTOR_ALL_INPUTS: {patientId: number; appointmentId: number};
  DOCTOR_PRESENTING_COMPLAINTS: undefined;
  DOCTOR_DIAGNOSIS: undefined;
  DOCTOR_PRESCRIPTIONS: {patientId: number};
  DOCTOR_PROCEDURES: undefined;
  DOCTOR_OTHER_PLAN_ITEMS: {patientId: number; appointmentId: number};
  DOCTOR_VITAL_SIGNS: undefined;
  DOCTOR_ADD_NOTES: {patientId: number; appointmentId: number};
};

const {Navigator, Screen} =
  createNativeStackNavigator<DoctorRootStackParamList>();

const DoctorRootNavigation = () => {
  return (
    <Navigator
      initialRouteName={routesNames.DOCTOR.DOCTOR_BOTTOM_TAB}
      screenOptions={{headerShown: false}}>
      <Screen
        name={routesNames.DOCTOR.DOCTOR_BOTTOM_TAB}
        component={DoctorBottomTab}
      />
      <Screen
        name={routesNames.DOCTOR.DOCTOR_ALL_INPUTS}
        component={AllInputs}
      />
      <Screen
        name={routesNames.DOCTOR.DOCTOR_PRESENTING_COMPLAINTS}
        component={PresentingComplaintsScreen}
      />
      <Screen
        name={routesNames.DOCTOR.DOCTOR_DIAGNOSIS}
        component={Diagnosis}
      />

      <Screen
        name={routesNames.DOCTOR.DOCTOR_PRESCRIPTIONS}
        component={PrescriptionScreen}
      />
      <Screen
        name={routesNames.DOCTOR.DOCTOR_PROCEDURES}
        component={Procedures}
      />
    </Navigator>
  );
};

export default DoctorRootNavigation;
