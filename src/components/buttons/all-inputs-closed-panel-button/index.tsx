import React from 'react';
import AppButton from '../app-button';
import {AllInputsClosedPanelButtonProps} from './type';
import {DownCaretIcon} from '@/assets/svg';
import {useColors} from '@/hooks/useColors';
import {allInputsClosedPanelButtonStyle} from './style';

const AllInputsClosedPanelButton = ({
  height,
  onPress,
  text,
  marginTop = 16,
}: AllInputsClosedPanelButtonProps) => {
  const {colors} = useColors();
  const style = allInputsClosedPanelButtonStyle(colors, marginTop);
  return (
    <AppButton
      text={text}
      height={height}
      onPress={onPress}
      buttonColor={'white'}
      textColor={'text400'}
      textType={'body_1_semibold'}
      containerStyle={style.container}
      RightContent={
        <DownCaretIcon stroke={colors.text400} style={style.icon} />
      }
    />
  );
};

export default AllInputsClosedPanelButton;
