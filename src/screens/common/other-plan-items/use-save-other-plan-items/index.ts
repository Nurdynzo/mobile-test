import {showToast} from '@/components/app-toast';
import {useApiServicesAppPlanitemsCreateplanitemsPostMutation} from '@/state/services/planItemsApi';
import {SnowstormSimpleResponseDto} from '@/state/services/snowstorm';

export const useSaveOtherPlanItems = ({
  patientFullName,
  patientId,
  appointmentId,
}: {
  patientId: number;
  appointmentId: number;
  patientFullName: string;
}) => {
  const [
    createPlanItems,
    {isLoading: isCreatePlanItemLoading, isError, isSuccess},
  ] = useApiServicesAppPlanitemsCreateplanitemsPostMutation();

  const handleSave = async ({
    selectedItems,
    reset,
  }: {
    selectedItems: SnowstormSimpleResponseDto[];
    reset: () => void;
  }) => {
    if (selectedItems.length) {
      try {
        await createPlanItems({
          createPlanItemsDto: {
            patientId,
            appointmentId,
            planItemsSnowmedIds: selectedItems
              .filter(item => item.id !== undefined && item.id !== null)
              .map(item => item.id as string),

            description: selectedItems.map(p => p.name).join(', '),
          },
        }).unwrap();

        showToast('SUCCESS', {
          title: 'Other plan items added sucessfully',
          message: `${patientFullName} Other plan items has been added to our records`,
        });

        reset();
      } catch (error) {
        showToast('ERROR', {
          title: 'Other plan items Error Encountered!',
          message: `${patientFullName} note failed to be added to our records`,
        });
      }
    }
  };

  return {
    isCreatePlanItemLoading: isCreatePlanItemLoading,
    handleSave,
    isError,
    isSuccess,
  };
};
