import {AppText} from '@/components/common';
import {tabSwitchStyles} from '@/components/tabs/tab-switch/styles';
import {useColors} from '@/hooks/useColors';
import React from 'react';
import {TouchableOpacity, View, ViewStyle} from 'react-native';

interface TabProps {
  title: string;
  active: boolean;
  onPress: () => void;
}

interface TabComponentProps {
  tabs: {title: string; key: string}[];
  activeTab: string;
  setActiveTab: (tabKey: string) => void;
  extraStyles?: ViewStyle;
}

const AppTabSwitch = ({active, onPress, title}: TabProps) => {
  const {colors} = useColors();
  const styles = tabSwitchStyles({colors});
  return (
    <TouchableOpacity style={styles.tab} onPress={onPress}>
      <View style={styles.tabContent}>
        <AppText
          text={title}
          style={[styles.tabText, active && styles.activeTabText]}
        />
        <View
          style={[styles.tabIndicator, active && styles.activeTabIndicator]}
        />
      </View>
    </TouchableOpacity>
  );
};

export const AppTabComponent = ({
  tabs,
  activeTab,
  setActiveTab,
  extraStyles,
}: TabComponentProps) => {
  const {colors} = useColors();
  const styles = tabSwitchStyles({colors});
  return (
    <View style={[styles.container, extraStyles]}>
      {tabs.map(tab => (
        <AppTabSwitch
          key={tab.key}
          title={tab.title}
          active={activeTab === tab.key}
          onPress={() => setActiveTab(tab.key)}
        />
      ))}
    </View>
  );
};
