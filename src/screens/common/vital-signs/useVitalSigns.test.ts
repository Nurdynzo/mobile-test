import {act, waitFor} from '@testing-library/react-native';
import {renderHookWithProviders} from 'test-utils';
import {useVitalSigns} from '@/screens/common/vital-signs/useVitalSigns';

describe('useVitalSigns hook', () => {
  it('should update vitals correctly when updateVitals for heart rate is called', async () => {
    const {result} = renderHookWithProviders(() => useVitalSigns());

    act(() => {
      result.current.updateVitals('heartRate', 80);
    });

    await waitFor(() => {
      expect(result.current.vitals.heartRate).toEqual(80);
    });
  });
});
