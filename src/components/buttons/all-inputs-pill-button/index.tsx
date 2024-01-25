import {useColors} from '@/hooks/useColors';
import {TypographyKeys} from '@/resources/fonts';
import VoidFunction from '@/types/voidfunction';
import {TouchableOpacity} from 'react-native';
import AppText from '../../common/app-text';
import {CloseIcon, PlusIcon} from '@/assets/svg';
import React from 'react';
import {wp} from '@/resources/config';
import {allInputsPillButtonStyles} from './styles';

export const AllInputsPillButton = ({
  text,
  isSelected = false,
  textType = 'pills_capsules_semibold',
  onPress,
  borderWidth = 1,
}: {
  onPress?: VoidFunction;
  text: string;
  isSelected?: boolean;
  textType?: TypographyKeys;
  borderWidth?: number;
}) => {
  const {colors} = useColors();
  const styles = allInputsPillButtonStyles({colors, isSelected, borderWidth});
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={styles.button}>
      <AppText
        text={text}
        type={textType}
        color={'text400'}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{flexShrink: 1}}
      />
      {isSelected ? (
        <CloseIcon fill={colors.text300} height={wp(16)} width={wp(16)} />
      ) : (
        <PlusIcon height={wp(16)} width={wp(16)} />
      )}
    </TouchableOpacity>
  );
};

export default AllInputsPillButton;
