// TODO_ALL(franklyn)

import {NavigationProp, RouteProp} from '@react-navigation/native';
import {DoctorRootStackParamList} from './doctor/root-navigation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {FrontDeskRootStackParamList} from './front-desk/root-navigation/type';
import {NurseRootStackParamList} from './nurse/root-navigation/types';

export type GeneralScreenProps<T extends keyof ReactNavigation.RootParamList> =
  {
    navigation: NavigationProp<ReactNavigation.RootParamList, T>;
    route: RouteProp<Omit<ReactNavigation.RootParamList, ''>, T>;
  };

export type GeneralRouteParamList = {
  VIEW_PARER_RECORDS_TAB: {
    patient: {id: number; code: string};
    disableRegularTab?: boolean;
  };
  OTHER_PLAN_ITEMS: {patientId: number; appointmentId: number};
  VITAL_SIGNS: {patientId: number; appointmentId: number};
  ADD_NOTES: {patientId: number; appointmentId: number};
  INVESTIGATIONS: {patientId: number; appointmentId: number};
};

export type GeneralScreenNavigationProps<
  T extends keyof ReactNavigation.RootParamList,
> = NavigationProp<ReactNavigation.RootParamList, T>;

export type GeneralScreenRouteProps<
  T extends keyof ReactNavigation.RootParamList,
> = RouteProp<Omit<ReactNavigation.RootParamList, ''>, T>;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    interface RootParamList
      extends FrontDeskRootStackParamList,
        DoctorRootStackParamList,
        NurseRootStackParamList,
        GeneralRouteParamList {}
  }
}

export type GeneralNavProp = NavigationProp<ReactNavigation.RootParamList>;

export type FrontDeskNavProp =
  NativeStackNavigationProp<FrontDeskRootStackParamList>;

export type DoctorNavProp = NativeStackNavigationProp<DoctorRootStackParamList>;

export type NurseNavProp = NativeStackNavigationProp<NurseRootStackParamList>;
