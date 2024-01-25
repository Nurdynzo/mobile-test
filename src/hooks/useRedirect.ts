import {showToast} from '@/components/app-toast';
import {useAppDispatch} from '@/state/hooks';
import {login} from '@/state/slices/auth/auth';
import {
  UserClaimTypes,
  UserInformationType,
  RolesTypes,
} from '@/state/slices/auth/type';

export const useRedirect = () => {
  const dispatch = useAppDispatch();

  const redirect = ({
    roleIdentity,
    decodedToken,
    userClaims,
  }: {
    roleIdentity: RolesTypes;
    decodedToken: UserInformationType;
    userClaims: UserClaimTypes;
  }) => {
    if (
      roleIdentity?.includes('Doctor') ||
      roleIdentity?.includes('Receptionist') ||
      roleIdentity?.includes('Nurse')
    ) {
      dispatch(
        login({
          role: roleIdentity as RolesTypes,
          userInformation: decodedToken as UserInformationType,
          userClaims,
        }),
      );
    } else {
      showToast('INFO', {
        title: 'Use our website',
        message: 'Please use our official website at this time.',
      });
    }
  };

  return redirect;
};
