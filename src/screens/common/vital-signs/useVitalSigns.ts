import {useSheet} from '@/hooks/useSheet';
import {useState} from 'react';
import {SelectedProps, VitalsProps} from './type';
import {useVitalsScores} from './useVitalsScores';

export const useVitalSigns = () => {
  const {
    painScale,
    setPainScale,
    selectedCGSscoreTab,
    setSelectedCGSscoreTab,
    scores,
    setScores,
    totalScore,
    updateScores,
    handleAddPointToScore,
  } = useVitalsScores();

  const {
    sheetRef: extraMenuSheet,
    openSheet: openExtraMenuSheet,
    closeSheet: closeExtraMenuSheet,
  } = useSheet();

  const [vitals, setVitals] = useState<VitalsProps>({
    heartRate: null,
    height: null,
    temperature: null,
    spo2: null,
  });

  const [selectedVitals, setSelectedVitals] = useState<Array<SelectedProps>>(
    [],
  );

  // TODO(Zucci): Kindly take a look at the eslint problem below
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateVitals = (field: keyof VitalsProps, value: any) => {
    setVitals({...vitals, [field]: value});
  };

  const checkIfItemIsSelected = (item: SelectedProps): boolean => {
    return selectedVitals.some(selected => selected?.id === item?.id);
  };

  const handleOnSelectItem = (item: SelectedProps) => {
    //For speed, I've used a Set here.

    if (item && item.id !== undefined) {
      const selectedVitalsSet = new Set(selectedVitals.map(vital => vital?.id));

      if (selectedVitalsSet.has(item.id)) {
        selectedVitalsSet.delete(item.id);
      } else {
        selectedVitalsSet.add(item.id);
      }

      setSelectedVitals(
        Array.from(selectedVitalsSet).map(id => ({id} as SelectedProps)),
      );
    }
  };

  return {
    scores,
    checkIfItemIsSelected,
    handleOnSelectItem,
    handleAddPointToScore,
    updateScores,
    setScores,
    totalScore,
    extraMenuSheet,
    openExtraMenuSheet,
    closeExtraMenuSheet,
    setVitals,
    vitals,
    updateVitals,
    setSelectedVitals,
    painScale,
    setPainScale,
    selectedCGSscoreTab,
    setSelectedCGSscoreTab,
  };
};
