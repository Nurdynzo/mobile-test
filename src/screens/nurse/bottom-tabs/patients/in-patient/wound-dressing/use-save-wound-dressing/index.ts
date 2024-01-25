import {showToast} from '@/components/app-toast';
import {SnowstormSimpleResponseDto} from '@/state/services/snowstorm';
import {useApiServicesAppWounddressingCreatewounddressingPostMutation} from '@/state/services/woundDressingApi';

export const useSaveWoundDressing = ({
  appointmentId,
  patientId,
}: {
  appointmentId: number;
  patientId: number;
}) => {
  const [
    saveWoundDressing,
    {
      isLoading: isSavingWoundDressing,
      isError: woundDressingError,
      isSuccess: woundDressingSuccess,
      data: woundDressingData,
    },
  ] = useApiServicesAppWounddressingCreatewounddressingPostMutation();

  const extractIds = (extractIds: Array<SnowstormSimpleResponseDto>) => {
    return extractIds.map(item => item.name /* id */);
  };

  const handleSaveWoundDressing = async (
    woundDressingSnowmedIds: Array<SnowstormSimpleResponseDto>,
  ) => {
    const woundDressings = extractIds(woundDressingSnowmedIds);
    const payload = {
      appointmentId,
      patientId,
      description: '',
      stamp: 0,
      woundDressingSnowmedIds: woundDressings as string[],
    };

    await saveWoundDressing({
      createWoundDressingDto: {...payload},
    }).unwrap();

    showToast('SUCCESS', {
      title: 'Successful!',
      message: 'Successfully added wound dressing!',
    });
  };

  return {
    handleSaveWoundDressing,
    isSavingWoundDressing,
    woundDressingError,
    woundDressingSuccess,
    woundDressingData,
  };
};
