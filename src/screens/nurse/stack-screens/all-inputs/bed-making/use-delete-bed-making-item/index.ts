import {showToast} from '@/components/app-toast';
import {useApiServicesAppBedmakingDeletecreatebedmakingDeleteMutation} from '@/state/services/bedMakingApi';

export const useDeleteBedMaking = ({
  patientFullName,
}: {
  patientFullName: string;
}) => {
  const [
    deleteBedMaking,
    {isLoading: isDeletingBedMaking, isSuccess, isError},
  ] = useApiServicesAppBedmakingDeletecreatebedmakingDeleteMutation();

  const handleDeleteBedMaking = async (bedMakingId: number | undefined) => {
    if (bedMakingId) {
      try {
        await deleteBedMaking({bedMakingId}).unwrap();
        showToast('SUCCESS', {
          title: 'Bed making deleted sucessfully',
          message: `${patientFullName} Bed making has been deleted from our records`,
        });
      } catch (error) {
        showToast('ERROR', {
          title: 'Delete bed making Error Encountered!',
          message: `${patientFullName} bed making failed to be deleted from our records`,
        });
      }
    }
  };

  return {
    isError,
    isSuccess,
    isDeletingBedMaking,
    handleDeleteBedMaking,
  };
};
