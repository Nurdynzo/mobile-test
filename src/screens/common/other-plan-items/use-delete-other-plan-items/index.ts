import {showToast} from '@/components/app-toast';
import {useApiServicesAppPlanitemsDeletecreateplanitemsDeleteMutation} from '@/state/services/planItemsApi';

export const useDeleteOtherPlanItems = ({
  patientFullName,
}: {
  patientFullName: string;
}) => {
  const [
    deletePlanItems,
    {isLoading: isDeletingOtherPlanItem, isSuccess, isError},
  ] = useApiServicesAppPlanitemsDeletecreateplanitemsDeleteMutation();

  const handleDeleteOtherPlanItems = async (
    planItemsId: number | undefined,
  ) => {
    if (planItemsId) {
      try {
        await deletePlanItems({
          planItemsId,
        }).unwrap();
        showToast('SUCCESS', {
          title: 'Other plan items deleted sucessfully',
          message: `${patientFullName} other plan items has been deleted from our records`,
        });
      } catch (error) {
        showToast('ERROR', {
          title: 'Delete Other plan items Error Encountered!',
          message: `${patientFullName} other plan items failed to be deleted from our records`,
        });
      }
    }
  };

  return {
    isError,
    isSuccess,
    isDeletingOtherPlanItem,
    handleDeleteOtherPlanItems: handleDeleteOtherPlanItems,
  };
};
