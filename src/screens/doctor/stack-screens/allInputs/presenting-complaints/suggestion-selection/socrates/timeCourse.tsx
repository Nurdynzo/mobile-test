import React from 'react';
import {SocratesQuestionText} from './common';
import {AppSelectInput} from '@/components/inputs';

const TimeCourseView = () => {
  return (
    <>
      <SocratesQuestionText text={'Does it follow any time pattern?'} />
      <AppSelectInput
        label={'Symptoms usually felt'}
        placeholder={'Select time'}
      />
    </>
  );
};

export default TimeCourseView;
