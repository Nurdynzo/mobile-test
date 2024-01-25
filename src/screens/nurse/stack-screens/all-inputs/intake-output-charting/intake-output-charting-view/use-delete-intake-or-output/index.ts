import {showToast} from '@/components/app-toast';
import {useApiServicesAppIntakeoutputDeleteintakeoroutputDeleteMutation} from '@/state/services/intakeOutputApi';

export const useDeleteIntakeOrOutput = ({
  patientFullName,
}: {
  patientFullName: string;
}) => {
  const [
    deleteIntakeOutput,
    {isLoading: isDeletingIntakeOrOutput, isSuccess, isError},
  ] = useApiServicesAppIntakeoutputDeleteintakeoroutputDeleteMutation();

  const handleDeleteIntakeOrOutput = async (
    intakeOrOutputId: number | undefined | null,
  ) => {
    if (intakeOrOutputId) {
      try {
        await deleteIntakeOutput({
          intakeOrOutputId,
        }).unwrap();
        showToast('SUCCESS', {
          title: 'Summary deleted sucessfully',
          message: `${patientFullName} summary has been deleted from our records`,
        });
      } catch (error) {
        showToast('ERROR', {
          title: 'Delete Summary Error Encountered!',
          message: `${patientFullName} summary failed to be deleted from our records`,
        });
      }
    }
  };

  return {
    isError,
    isSuccess,
    isDeletingIntakeOrOutput,
    handleDeleteIntakeOrOutput,
  };
};
