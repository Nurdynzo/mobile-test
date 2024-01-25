import {TabButton} from '@/components/tab-button';
import {useColors} from '@/hooks/useColors';
import {wp} from '@/resources/config';
import React from 'react';
import {View} from 'react-native';
import {SocratesSuggestionToggleButtonStyles} from './styles';

/**
 * By default items is set to ['Present', 'Absent'].
 *
 */
const SocratesSuggestionToggleButton = ({
  activeItem,
  items = ['Present', 'Absent'],
  setActiveItem,
}: {
  activeItem: string;
  setActiveItem: (item: string) => void;
  items?: string[];
}) => {
  const {colors} = useColors();
  const styles = SocratesSuggestionToggleButtonStyles({colors});
  return (
    <View style={styles.container}>
      {items.map((viewLabel, index) => {
        return (
          <TabButton
            key={index}
            label={viewLabel}
            activeTab={activeItem}
            inActiveBgColor={'neutral25'}
            inActiveTextColor={'text300'}
            setActiveTab={setActiveItem}
            textType={'button_semibold'}
            otherStyles={{
              width: undefined,
              paddingHorizontal: wp(16),
              paddingVertical: wp(4),
            }}
          />
        );
      })}
    </View>
  );
};

export default SocratesSuggestionToggleButton;
