import {showToast} from '@/components/app-toast';
import {useApiServicesAppBedmakingCreatebedmakingPostMutation} from '@/state/services/bedMakingApi';
import {SnowstormSimpleResponseDto} from '@/state/services/snowstorm';

export const useSaveBedMaking = ({
  patientFullName,
  patientId,
  appointmentId,
}: {
  patientId: number;
  appointmentId: number;
  patientFullName: string;
}) => {
  const [
    createBedMaking,
    {isLoading: isCreateBedMakingLoading, isError, isSuccess},
  ] = useApiServicesAppBedmakingCreatebedmakingPostMutation();

  const handleSave = async ({
    selectedItems,
    reset,
  }: {
    selectedItems: SnowstormSimpleResponseDto[];
    reset: () => void;
  }) => {
    if (selectedItems.length) {
      try {
        await createBedMaking({
          createBedMakingDto: {
            patientId,
            appointmentId: appointmentId,
            note: selectedItems.map(p => p.name).join(', '),
          },
        }).unwrap();
        showToast('SUCCESS', {
          title: 'Note added sucessfully',
          message: `${patientFullName} bed making has been added to our records`,
        });

        reset();
      } catch (error) {
        showToast('ERROR', {
          title: 'Create bed making Error Encountered!',
          message: `${patientFullName} bed making failed to be added to our records`,
        });
      }
    }
  };

  return {
    isCreateBedMakingLoading,
    handleSave,
    isError,
    isSuccess,
  };
};
