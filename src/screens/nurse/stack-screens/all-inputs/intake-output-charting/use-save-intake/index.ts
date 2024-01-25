import {showToast} from '@/components/app-toast';
import {useApiServicesAppIntakeoutputCreateoreditintakePostMutation} from '@/state/services/intakeOutputApi';
import {OnSaveProps} from '../types';
import {getErrorMessage} from '@/utils/helpers';

export const useSaveIntake = ({
  patientFullName,
  patientId,
}: {
  patientId: number;
  patientFullName: string;
}) => {
  const [createIntake, {isLoading: isCreateIntakeLoading, isError, isSuccess}] =
    useApiServicesAppIntakeoutputCreateoreditintakePostMutation();

  const handleSave = async ({
    data: {suggestedText, volumnInMls},
    reset,
  }: OnSaveProps) => {
    try {
      await createIntake({
        createIntakeOutputDto: {
          patientId,
          suggestedText,
          volumnInMls: Number(volumnInMls),
        },
      }).unwrap();
      showToast('SUCCESS', {
        title: 'Intake added sucessfully',
        message: `${patientFullName} intake has been added to our records`,
      });

      reset();
    } catch (error) {
      showToast('ERROR', {
        title: 'Save Intake Error Encountered!',
        message: getErrorMessage(error),
      });
    }
  };

  return {
    isCreateIntakeLoading,
    handleSave,
    isError,
    isSuccess,
  };
};
