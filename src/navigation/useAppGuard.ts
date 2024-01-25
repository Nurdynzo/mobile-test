import InfoScreen from '@/components/info-screen';
import {useRedirect} from '@/hooks/useRedirect';
import {useAppDispatch, useAppSelector} from '@/state/hooks';
import {selectAuth} from '@/state/slices/auth/auth';
import {
  AuthStatus,
  RolesTypes,
  UserClaimTypes,
  UserInformationType,
} from '@/state/slices/auth/type';
import {RootState} from '@/state/store';
import AuthPayload from '@/types/authPayload';
import {prepareUserInfo} from '@/utils/auth/auth';
import {localStorage, localStorageKeys} from '@/utils/localStorage';
import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import DoctorRootNavigation from './doctor/root-navigation';
import FrontDeskRootNavigation from './front-desk/root-navigation';
import {routesNames} from './routes';
import NurseRootNavigation from './nurse/root-navigation';

// TODO(Philip): Type the role
function getRouteAndNavigation(role: string) {
  if (role.includes('Doctor')) {
    return {
      route: routesNames.DOCTOR.DOCTOR_ROOT_NAVIGATION,
      routeNavigation: DoctorRootNavigation,
    };
  } else if (role.includes('Receptionist')) {
    return {
      route: routesNames.FRONT_DESK.FD_ROOT_NAVIGATION,
      routeNavigation: FrontDeskRootNavigation,
    };
  } else if (role.includes('Nurse')) {
    return {
      route: routesNames.FRONT_DESK.FD_ROOT_NAVIGATION,
      routeNavigation: NurseRootNavigation,
    };
  } else {
    return {
      route: 'info',
      routeNavigation: InfoScreen,
    };
  }
}

export const useAppGuard = () => {
  const redirect = useRedirect();

  const auth = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const {role} = useSelector((state: RootState) => state.auth);

  const {route, routeNavigation} = getRouteAndNavigation(role);

  useEffect(() => {
    if (auth?.status === AuthStatus?.loggedOut) {
      localStorage.removeAll();
      return;
    }
  }, [auth]);

  useEffect(() => {
    const authPayload: AuthPayload | null = localStorage.get(
      localStorageKeys.accessToken,
    );
    if (authPayload) {
      const {decodedToken, roleIdentity, userClaims} = prepareUserInfo(
        authPayload.accessToken as string,
      );
      redirect({
        roleIdentity: roleIdentity as RolesTypes,
        decodedToken: decodedToken as UserInformationType,
        userClaims: userClaims as UserClaimTypes,
      });
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return {
    redirect,
    auth,
    dispatch,
    role,
    route,
    routeNavigation,
  };
};
