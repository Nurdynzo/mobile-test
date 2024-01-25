import React from 'react';
import {View} from 'react-native';
import AppText from '../../common/app-text';
import {formHeaderStyles} from './styles';
import {formHeaderProp} from './type';

const FormHeader = ({
  desc = 'description',
  title = 'title',
}: formHeaderProp) => {
  return (
    <View style={formHeaderStyles().container}>
      <AppText color={'text400'} text={title} align="left" />
      <AppText
        color={'text300'}
        text={desc}
        type="subtitle_medium"
        align="left"
      />
    </View>
  );
};

export default FormHeader;
