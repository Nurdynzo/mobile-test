import {renderHookWithProviders} from 'test-utils';
import {useSaveInputNote} from '.';
import {act} from 'react-test-renderer';

describe('useSaveInputNote', () => {
  it('should save input note summary', async () => {
    const {result} = renderHookWithProviders(() =>
      useSaveInputNote({
        patientFullName: 'John Doe',
        patientId: 1,
        appointmentId: 1,
      }),
    );

    await act(async () => {
      await result.current.handleSave({
        selectedItems: [{id: '1', name: 'Test1'}],
        reset: () => null,
      });
    });

    expect(result.current.isSuccess).toBe(true);
  });
});
