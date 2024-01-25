import {InfoCircleIcon} from '@/assets/svg';
import {wp} from '@/resources/config';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {FunctionComponent} from 'react';
import {Pressable} from 'react-native';
import AppTabButton from '../../../components/buttons/app-bottom-tab';
import {useColors} from '../../../hooks/useColors';
import {TabConfig} from './type';

const {Navigator, Screen} = createBottomTabNavigator();

interface BottomTabsProps {
  tabs: TabConfig[];
}

const BottomTabs: FunctionComponent<BottomTabsProps> = ({tabs}) => {
  const {colors} = useColors();

  return (
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
          marginHorizontal: 2,
        },
        tabBarActiveTintColor: colors.primary400,
        tabBarInactiveTintColor: colors.default600,
      }}>
      {tabs.map(({name, component, Icon = InfoCircleIcon, label, disabled}) => (
        <Screen
          key={name}
          name={name}
          component={component}
          options={{
            tabBarIcon: ({color, focused}) => (
              <AppTabButton
                label={label}
                icon={
                  <Icon fill={focused ? colors.primary400 : colors.text100} />
                }
                color={color}
                isFocused={focused}
              />
            ),
            tabBarButton: tabProps => (
              <Pressable {...tabProps} disabled={disabled} />
            ),
          }}
        />
      ))}
    </Navigator>
  );
};

export default BottomTabs;
