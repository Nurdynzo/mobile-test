/* eslint-disable react/no-unstable-nested-components */
import {FormFieldController} from '@/components/forms/form-field-controller';
import {SelectItemValueFieldControls} from '@/types/formFieldsControls';
import React from 'react';
import AppSelectInput from '../../app-select-input';
import {FieldValues} from 'react-hook-form';
import {FormSelectInputProps} from '../type';
import {useApiServicesAppReligionGetreligionsGetQuery} from '@/state/services/religionApi';

const ReligionSelectInput = <T extends FieldValues>({
  name,
  control,
}: FormSelectInputProps<T>) => {
  const {data: religions, isLoading: isReligionsLoading} =
    useApiServicesAppReligionGetreligionsGetQuery();
  return (
    <FormFieldController
      name={name}
      control={control}
      Field={({onChange, value}: SelectItemValueFieldControls) => {
        return (
          <AppSelectInput
            label="Religion"
            placeholder="Select religion"
            onChange={item => onChange(item?.value)}
            value={value}
            isOptionsLoading={isReligionsLoading}
            selectOptions={religions?.map(item => {
              return {item: {id: item, value: item}};
            })}
          />
        );
      }}
    />
  );
};

export default ReligionSelectInput;
