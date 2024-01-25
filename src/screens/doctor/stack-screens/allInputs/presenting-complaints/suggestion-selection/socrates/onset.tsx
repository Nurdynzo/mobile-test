import React from 'react';
import {SocratesQuestionText} from './common';
import {AppSelectInput, AppSelectTextInput} from '@/components/inputs';

const OnsetView = () => {
  return (
    <>
      <SocratesQuestionText text={'When did it start?'} />
      <AppSelectInput
        label={'Cyclicality'}
        placeholder={'Select cyclicality'}
      />
      <InputAndSelectComp />
    </>
  );
};

export default OnsetView;

const InputAndSelectComp = () => {
  return (
    <>
      <AppSelectTextInput />
    </>
  );
};
