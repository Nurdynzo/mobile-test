import {ReactNode} from 'react';

export type ProfileNavCardProps<R> = {
  title: string;
  Icon: ReactNode;
  routeName: R;
};

export type PatientProfileScreenProps<R> = {
  profileData: readonly ProfileNavCardProps<R>[];
  handleRoute: (routeName: R) => void;
};
