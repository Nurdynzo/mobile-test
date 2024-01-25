import React from 'react';
import {TouchableOpacity} from 'react-native';
import {useColors} from '@/hooks/useColors';
import AppText from '../../common/app-text';
import {appButtonStyles} from './styles';
import {AppButtonProps} from './type';
import {ActivityIndicator} from 'react-native';

/**
 *
 * @param text defaults to Add Label
 * @param textType defaults to button_semibold
 * @param textColor defaults to white
 * @param borderWidth defaults to 1
 */
const AppButton = ({
  height,
  width,
  text = 'Add Label',
  onPress,
  buttonColor,
  isDisabled,
  isLoading,
  containerStyle,
  textType = 'button_semibold',
  textColor = 'white',
  borderColor,
  borderRadius,
  borderWidth = 1,
  LeftContent,
  RightContent,
  borderStyle,
  textStyle,
  paddingHorizontal,
  flex,
}: AppButtonProps) => {
  const {colors} = useColors();

  const styles = appButtonStyles({
    height,
    width,
    isDisabled,
    colors,
    borderColor,
    borderRadius,
    borderWidth,
    buttonColor,
    borderStyle,
    paddingHorizontal,
    flex,
  });

  return (
    <TouchableOpacity
      activeOpacity={isDisabled ? 1 : 0.8}
      disabled={isDisabled}
      onPress={onPress}
      style={[styles.container, containerStyle]}>
      {LeftContent}
      {isLoading ? (
        <ActivityIndicator color={buttonColor} size={25} />
      ) : (
        <AppText
          color={textColor}
          type={textType}
          text={text}
          align={'center'}
          style={textStyle}
        />
      )}
      {RightContent}
    </TouchableOpacity>
  );
};

export default AppButton;
