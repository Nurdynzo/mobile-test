import {renderHookWithProviders} from 'test-utils';
import {useSaveIntake} from '.';
import {act} from 'react-test-renderer';

describe('useSaveIntake', () => {
  it('should save intake summary', async () => {
    const {result} = renderHookWithProviders(() =>
      useSaveIntake({
        patientFullName: 'John Doe',
        patientId: 1,
      }),
    );

    await act(async () => {
      await result.current.handleSave({
        data: {
          suggestedText: 'Water',
          volumnInMls: '2',
        },
        reset: () => null,
      });
    });

    expect(result.current.isSuccess).toBe(true);
  });
});
