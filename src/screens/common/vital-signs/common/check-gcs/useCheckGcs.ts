import {useSheet} from '@/hooks/useSheet';

export const useCheckGcs = () => {
  const {
    sheetRef: checkGCSsheet,
    openSheet: openCheckGCSsheet,
    closeSheet: closeCheckGCSsheet,
  } = useSheet();

  return {
    checkGCSsheet,
    openCheckGCSsheet,
    closeCheckGCSsheet,
  };
};
