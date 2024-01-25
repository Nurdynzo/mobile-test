import {AppText} from '@/components/common';
import {useColors} from '@/hooks/useColors';
import React, {FunctionComponent} from 'react';
import {Pressable, View} from 'react-native';
import {appTabSwitcherStyles} from './styles';
import {AppTabSwitcherProps} from './types';

const AppTabSwitcher: FunctionComponent<AppTabSwitcherProps> = ({
  selectedIndex = 0,
  tabs = [],
  onChangeTab = () => null,
  disabled,
  hasFlex = true,
  extraStyles,
}) => {
  const {colors} = useColors();
  const styles = appTabSwitcherStyles({colors, hasFlex});
  if (!tabs.length) {
    return <></>;
  }
  return (
    <View style={[styles.tabContainer, extraStyles]}>
      {tabs.map((item, index) => (
        <Pressable
          disabled={disabled}
          onPress={() => onChangeTab(index)}
          key={index}
          style={[
            styles.tab,
            // eslint-disable-next-line react-native/no-inline-styles
            {
              backgroundColor:
                index === selectedIndex ? colors?.neutral100 : 'transparent',
            },
          ]}>
          <AppText
            text={item.name}
            numberOfLines={1}
            type={'button_semibold'}
            align="center"
            color={index === selectedIndex ? 'text400' : 'text300'}
          />
        </Pressable>
      ))}
    </View>
  );
};

export default AppTabSwitcher;
