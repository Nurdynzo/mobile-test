import {useSheet} from '@/hooks/useSheet';

export const useAddVitalSigns = () => {
  const {
    sheetRef: addVitalSignSheet,
    openSheet: openAddVitalSignSheet,
    closeSheet: closeAddVitalSignSheet,
  } = useSheet();

  return {
    addVitalSignSheet,
    openAddVitalSignSheet,
    closeAddVitalSignSheet,
  };
};
