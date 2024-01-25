import {showToast} from '@/components/app-toast';
import {useRedirect} from '@/hooks/useRedirect';
import {useApiTokenauthAuthenticatePostMutation} from '@/state/services/tokenAuthApi';
import {
  RolesTypes,
  UserClaimTypes,
  UserInformationType,
} from '@/state/slices/auth/type';
import AuthPayload from '@/types/authPayload';
import {prepareUserInfo} from '@/utils/auth/auth';
import {getErrorMessage} from '@/utils/helpers';
import {localStorage, localStorageKeys} from '@/utils/localStorage';
import {LoginSchema} from '../type';

const useLogin = () => {
  const redirect = useRedirect();

  const [loginRequest, {isError, isLoading}] =
    useApiTokenauthAuthenticatePostMutation();

  const handleAuthentication = async (data: LoginSchema) => {
    try {
      const result = await loginRequest({
        authenticateModel: {
          userNameOrEmailAddress: data.emailAddress,
          password: data.password,
          tenancyName: `${process.env.TENANT_NAME}`,
        },
      }).unwrap();

      if (result.accessToken) {
        const accessTokenExpirationTimeInMs =
          (result.expireInSeconds ?? 0) * 1000;

        const authPayload: AuthPayload = {
          accessToken: result.accessToken,
          refreshToken: result.refreshToken,
          expiresAt: new Date(
            Date.now() + accessTokenExpirationTimeInMs,
          ).getTime(),
        };

        localStorage.store(localStorageKeys.accessToken, authPayload);

        const {decodedToken, roleIdentity, userClaims} = prepareUserInfo(
          authPayload.accessToken as string,
        );

        redirect({
          roleIdentity: roleIdentity as RolesTypes,
          decodedToken: decodedToken as UserInformationType,
          userClaims: userClaims as UserClaimTypes,
        });
      }
    } catch (error: unknown) {
      showToast('ERROR', {
        title: 'Sign-in Failed',
        message: getErrorMessage(error),
      });
    }
  };

  return {handleAuthentication, isError, isLoading};
};

export default useLogin;
