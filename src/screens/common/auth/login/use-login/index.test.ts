import {renderHookWithProviders} from '../../../../../../test-utils';
import {act, waitFor} from '@testing-library/react-native';
import useLogin from '@/screens/common/auth/login/use-login';
import {AuthStatus} from '@/state/slices/auth/type';

jest.mock('react-native-image-crop-picker', () => 'ImagePicker');
jest.mock('react-native-blob-util', () => 'ReactNativeBlobUtil');

describe('login hook', () => {
  it('given appropriate login details should login', async () => {
    const {result, store} = renderHookWithProviders(() => useLogin());

    expect(store.getState().auth.status).toBe(AuthStatus.none);

    await act(() => {
      result.current.handleAuthentication({
        emailAddress: 'admin@crest.com',
        password: 'password',
      });
    });

    await waitFor(() => {
      expect(store.getState().auth.status).toBe(AuthStatus.loggedIn);
    });
  });
});
