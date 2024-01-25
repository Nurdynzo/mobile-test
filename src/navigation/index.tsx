import {AuthStatus} from '@/state/slices/auth/type';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import AuthStack from './auth-stack';
import ViewPaperRecordTab from './common/view-paper-records-tab';
import {routesNames} from './routes';
import {useAppGuard} from './useAppGuard';
import {GeneralRouteParamList} from './types';
import {
  AddNotes,
  Investigations,
  OtherPlanItems,
  VitalSigns,
} from '@/screens/common';

const {Navigator, Screen, Group} = createNativeStackNavigator<
  GeneralRouteParamList & Omit<{[key: string]: undefined}, 'AUTH_STACK'>
>();

const RootNavigation = () => {
  const {auth, route, routeNavigation} = useAppGuard();

  return (
    <NavigationContainer>
      <Navigator
        initialRouteName={routesNames.AUTH_STACK}
        screenOptions={{headerShown: false}}>
        {auth?.status === AuthStatus?.loggedIn ? (
          <Group>
            <Screen name={route} component={routeNavigation} />
            <Screen
              name={routesNames.VIEW_PARER_RECORDS_TAB}
              component={ViewPaperRecordTab}
            />
            <Screen
              name={routesNames.OTHER_PLAN_ITEMS}
              component={OtherPlanItems}
            />
            <Screen name={routesNames.VITAL_SIGNS} component={VitalSigns} />
            <Screen name={routesNames.ADD_NOTES} component={AddNotes} />
            <Screen
              name={routesNames.INVESTIGATIONS}
              component={Investigations}
            />
          </Group>
        ) : (
          <Screen name={routesNames.AUTH_STACK} component={AuthStack} />
        )}
      </Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
