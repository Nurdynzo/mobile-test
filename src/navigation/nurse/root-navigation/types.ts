import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type NurseRootStackParamList = {
  NURSE_BOTTOM_TAB: undefined;
  NURSE_BED_MAKING: {patientId: number; appointmentId: number};
  NURSE_WOUND_DRESSING: {patientId: number; appointmentId: number};
  NURSE_INTAKE_OUTPUT_CHARTING: {patientId: number};
  NURSE_MISCELLANEOUS_INTERVENTIONS: {patientId: number; appointmentId: number};
  NURSING_CARE_PLAN: {patientId: number; appointmentId: number};
  OUT_PATIENT_NURSE_ALL_INPUT_LANDING_DASHBOARD: {
    patientId: number;
    appointmentId: number;
  };
  IN_PATIENT_NURSE_ALL_INPUT_LANDING_DASHBOARD: {
    patientId: number;
    appointmentId: number;
  };
};

export type FrontDeskNavigationProps<T extends keyof NurseRootStackParamList> =
  NativeStackNavigationProp<NurseRootStackParamList, T>;

export type FrontDeskRouteProps<T extends keyof NurseRootStackParamList> =
  RouteProp<NurseRootStackParamList, T>;

export type FrontDeskScreenProps<T extends keyof NurseRootStackParamList> = {
  navigation: NativeStackNavigationProp<NurseRootStackParamList, T>;
  route: RouteProp<NurseRootStackParamList, T>;
};
