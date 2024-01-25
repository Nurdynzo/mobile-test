import {renderHookWithProviders} from 'test-utils';
import {useGetIntakeOutputSavedHistory} from '.';
import {waitFor} from '@testing-library/react-native';

describe('useGetIntakeOutputSavedHistory', () => {
  it('should get intake saved history', async () => {
    const {result} = renderHookWithProviders(() =>
      useGetIntakeOutputSavedHistory({patientId: 2481, type: 'Intake'}),
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });
  });
  it('should get output saved history', async () => {
    const {result} = renderHookWithProviders(() =>
      useGetIntakeOutputSavedHistory({patientId: 2481, type: 'Output'}),
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });
  });
});
