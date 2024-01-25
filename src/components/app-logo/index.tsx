import React from 'react';
import {PlatMedIcon} from '../../assets/svg/index';
import {appLogoStyles} from './styles';

const AppLogo = () => {
  const style = appLogoStyles();
  return <PlatMedIcon style={style.container} />;
};

export default AppLogo;
