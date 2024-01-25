import {AllInputsSuggestionFormHookType} from '@/components/forms/all-inputs-suggestion-form/use-all-inputs-suggestion-form/type';
import {GetPatientDetailsOutDto} from '@/state/services/patientApi';
import {EMPTY_STRING} from '@/utils/constants';
import {useEffect, useState} from 'react';
import {historyDoseType} from '../../../../types';
import {useSaveVaccinationHistory} from '../use-save-vaccination-history';

export const useVaccinationHistory = ({
  id,
  patientDetails,
  formProps,
}: {
  id: number;
  patientDetails?: GetPatientDetailsOutDto;
  formProps: AllInputsSuggestionFormHookType;
}) => {
  const defaultState = {
    title: EMPTY_STRING,
    interval: EMPTY_STRING,
    howLong: EMPTY_STRING,
    note: EMPTY_STRING,
    hasComplication: false,
  };

  const [historyDoseForm, setHistoryDoseForm] =
    useState<historyDoseType>(defaultState);
  const {handleCreateVaccinationHistory, isLoading} =
    useSaveVaccinationHistory();

  const {selectedItems, text, reset} = formProps;

  const handleUpdateHistoryDoseForm = (
    field: keyof historyDoseType,
    value: string | number | boolean,
  ) => setHistoryDoseForm({...historyDoseForm, [field]: value});

  const handleSubmitVaccinationHistory = () => {
    handleCreateVaccinationHistory({
      historyDoseForm,
      id,
      patientId: patientDetails?.id as number,
      cleanup: () => {
        setHistoryDoseForm(defaultState);
        reset();
      },
    });
  };

  useEffect(() => {
    setHistoryDoseForm(defaultState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItems]);

  return {
    handleSubmitVaccinationHistory,
    handleUpdateHistoryDoseForm,
    historyDoseForm,
    isLoading,
    selectedItems,
    text,
    formProps,
  };
};
