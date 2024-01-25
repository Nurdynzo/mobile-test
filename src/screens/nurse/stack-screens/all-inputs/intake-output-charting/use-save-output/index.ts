import {showToast} from '@/components/app-toast';
import {useApiServicesAppIntakeoutputCreateoreditoutputPostMutation} from '@/state/services/intakeOutputApi';
import {OnSaveProps} from '../types';
import {getErrorMessage} from '@/utils/helpers';

export const useSaveOutput = ({
  patientFullName,
  patientId,
}: {
  patientId: number;
  patientFullName: string;
}) => {
  const [createOutput, {isLoading: isCreateOutputLoading, isError, isSuccess}] =
    useApiServicesAppIntakeoutputCreateoreditoutputPostMutation();

  const handleSave = async ({
    data: {suggestedText, volumnInMls},
    reset,
  }: OnSaveProps) => {
    try {
      await createOutput({
        createIntakeOutputDto: {
          patientId,
          suggestedText,
          volumnInMls: Number(volumnInMls),
        },
      }).unwrap();
      showToast('SUCCESS', {
        title: 'Output added sucessfully',
        message: `${patientFullName} output has been added to our records`,
      });

      reset();
    } catch (error) {
      showToast('ERROR', {
        title: 'Save output Error Encountered!',
        message: getErrorMessage(error),
      });
    }
  };

  return {
    isCreateOutputLoading,
    handleSave,
    isError,
    isSuccess,
  };
};
