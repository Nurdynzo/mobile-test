import React from 'react';
import {TouchableOpacity} from 'react-native';
import AppText from '../../common/app-text';
import {appLinkStyles} from './styles';
import {appLinkProps} from './type';

const AppLink = ({
  text = 'Enter Link',
  align = 'left',
  onPress,
  extraStyles,
}: appLinkProps) => {
  const styles = appLinkStyles();

  return (
    <TouchableOpacity onPress={onPress}>
      <AppText
        color={'primary400'}
        text={text}
        align={align}
        style={[styles.extraText, extraStyles]}
      />
    </TouchableOpacity>
  );
};

export default AppLink;
