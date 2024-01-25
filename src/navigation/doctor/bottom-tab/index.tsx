/* eslint-disable react/no-unstable-nested-components */
import {Patients} from '@/screens/doctor';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Alert, Image, View} from 'react-native';

import {
  AllPatients,
  BellIcon,
  MessageTextIcon,
  RightCaretIcon,
  SignOutIcon,
  UserIcon,
} from '@/assets/svg';
import {AppTabButton} from '@/components/buttons';
import {AppMenuSheet} from '@/components/sheets';
import {useColors} from '@/hooks/useColors';
import {useSheet} from '@/hooks/useSheet';
import {routesNames} from '@/navigation/routes';
import {wp} from '@/resources/config';
import {Profile} from '@/screens/doctor/bottom-tabs/profile';
import {useAppDispatch} from '@/state/hooks';
import {logOut} from '@/state/slices/auth/auth';
import {GlobalScreenTypes} from '@/types/screen';

const {Navigator, Screen} = createBottomTabNavigator();

const DoctorBottomTab = ({navigation}: GlobalScreenTypes) => {
  const {colors} = useColors();
  const dispatch = useAppDispatch();
  const {
    sheetRef: profileSheet,
    openSheet: openProfileSheet,
    closeSheet: closeProfileSheet,
  } = useSheet();
  return (
    <>
      <Navigator
        screenOptions={{
          lazy: true,
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarShowLabel: false,
          tabBarStyle: {
            paddingHorizontal: wp(10),
            height: wp(82),
          },
          tabBarIconStyle: {
            marginHorizontal: wp(2),
          },
          tabBarActiveTintColor: colors.primary400,
          tabBarInactiveTintColor: colors.default600,
        }}>
        <Screen
          name={routesNames.DOCTOR.DOCTOR_PATIENTS}
          component={Patients}
          options={{
            tabBarIcon: ({color, focused}) => (
              <AppTabButton
                label="Patients"
                icon={<UserIcon fill={color} />}
                color={color}
                isFocused={focused}
              />
            ),
          }}
        />
        <Screen
          name={routesNames.DOCTOR.DOCTOR_ALL_PATIENTS}
          component={View}
          options={() => ({
            tabBarIcon: ({color, focused}) => (
              <AppTabButton
                label="All Patients"
                icon={<AllPatients fill={color} />}
                color={color}
                isFocused={focused}
              />
            ),
          })}
        />
        <Screen
          name={routesNames.DOCTOR.DOCTOR_MESSAGES}
          component={View}
          options={() => ({
            tabBarIcon: ({color, focused}) => (
              <AppTabButton
                label="Messages"
                icon={<MessageTextIcon stroke={color} />}
                color={color}
                isFocused={focused}
              />
            ),
          })}
        />

        <Screen
          name={routesNames.DOCTOR.DOCTOR_NOTIFICATIONS}
          component={View}
          options={() => ({
            tabBarIcon: ({color, focused}) => (
              <AppTabButton
                label="Notifications"
                icon={<BellIcon stroke={color} />}
                color={color}
                isFocused={focused}
              />
            ),
          })}
        />
        <Screen
          name={routesNames.FRONT_DESK.FD_PROFILE}
          component={Profile}
          options={() => ({
            tabBarIcon: ({color, focused}) => (
              <AppTabButton
                label="Profile"
                icon={
                  <Image
                    source={{uri: 'https://picsum.photos/id/64/4326/2884'}}
                    style={{
                      width: wp(24),
                      height: wp(24),
                      borderRadius: wp(24 / 2),
                    }}
                  />
                }
                color={color}
                isFocused={focused}
              />
            ),
          })}
          listeners={() => ({
            tabPress: e => {
              // Prevent the default action (navigation)
              e.preventDefault();
              // Open the AppMenuSheet
              openProfileSheet();
            },
          })}
        />
      </Navigator>
      <AppMenuSheet
        title=""
        sheetRef={profileSheet}
        menuOptions={[
          {
            value: 'Profile',
            onPress: () => {
              navigation.navigate(routesNames.FRONT_DESK.FD_PROFILE);
              closeProfileSheet();
            },
          },
          {
            value: 'Switch Role',
            onPress: () => null,
          },
          {
            value: 'Calendar',
            onPress: () => null,
          },
          {
            value: 'Give feedback',
            onPress: () => null,
          },
          {
            value: 'Emergency leave',
            color: 'alert500',
            onPress: () => null,
          },
          {
            value: 'Sign out',
            color: 'danger500',
            icon: () => <SignOutIcon />,
            onPress: () => {
              Alert.alert(
                'Sign out',
                'You are about to sign out of this session',
                [
                  {
                    text: 'Back',
                  },
                  {
                    text: 'Proceed',
                    onPress: () => dispatch(logOut()),
                    style: 'destructive',
                  },
                ],
              );
            },
          },
        ]}
        renderRightIcon={() => <RightCaretIcon />}
      />
    </>
  );
};

export default DoctorBottomTab;
