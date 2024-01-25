import {useVitalsScores} from '@/screens/common/vital-signs/useVitalsScores';
import {act, waitFor} from '@testing-library/react-native';
import {renderHookWithProviders} from 'test-utils';

describe('useVitalsScores hook', () => {
  it('should update scores correctly when handleAddPointToScore is called', async () => {
    const {result} = renderHookWithProviders(() => useVitalsScores());

    act(() => {
      result.current.handleAddPointToScore({
        score: 4,
        text: 'Test Score',
        field: 'eye opening score',
      });
    });

    await waitFor(() => {
      expect(result.current.scores['eye opening score']).toEqual({
        score: 4,
        text: 'Test Score',
      });
    });
  });
});
