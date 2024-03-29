export type ColorKeys =
  | 'transparent'
  | 'background'
  | 'overlay'
  | 'white'
  | 'black'
  | 'neutral25'
  | 'neutral50'
  | 'neutral100'
  | 'neutral200'
  | 'text50'
  | 'text25'
  | 'neutral300'
  | 'neutral400'
  | 'neutral500'
  | 'neutral600'
  | 'neutral700'
  | 'neutral800'
  | 'neutral900'
  | 'primary25'
  | 'primary50'
  | 'primary100'
  | 'primary200'
  | 'primary300'
  | 'primary400'
  | 'primary500'
  | 'primary600'
  | 'primary700'
  | 'primary800'
  | 'primary900'
  | 'secondary25'
  | 'secondary50'
  | 'secondary100'
  | 'secondary200'
  | 'secondary300'
  | 'secondary400'
  | 'secondary500'
  | 'secondary600'
  | 'secondary700'
  | 'secondary800'
  | 'secondary900'
  | 'success25'
  | 'success50'
  | 'success100'
  | 'success200'
  | 'success300'
  | 'success400'
  | 'success500'
  | 'success600'
  | 'success700'
  | 'success800'
  | 'success900'
  | 'danger25'
  | 'danger50'
  | 'danger100'
  | 'danger200'
  | 'danger300'
  | 'danger400'
  | 'danger500'
  | 'danger600'
  | 'danger700'
  | 'danger800'
  | 'danger900'
  | 'alert25'
  | 'alert50'
  | 'alert100'
  | 'alert200'
  | 'alert300'
  | 'alert400'
  | 'alert500'
  | 'alert600'
  | 'alert700'
  | 'alert800'
  | 'alert900'
  | 'waiting25'
  | 'waiting50'
  | 'waiting100'
  | 'waiting200'
  | 'waiting300'
  | 'waiting400'
  | 'waiting500'
  | 'waiting600'
  | 'waiting700'
  | 'waiting800'
  | 'waiting900'
  | 'text25'
  | 'text50'
  | 'text100'
  | 'text200'
  | 'text300'
  | 'text400'
  | 'text500'
  | 'text600'
  | 'text700'
  | 'text800'
  | 'text900'
  | 'default25'
  | 'default50'
  | 'default100'
  | 'default200'
  | 'default300'
  | 'default400'
  | 'default500'
  | 'default600'
  | 'default700'
  | 'default800'
  | 'default900'
  | 'information25'
  | 'information50'
  | 'information100'
  | 'information200'
  | 'information300'
  | 'information400'
  | 'information500'
  | 'information600'
  | 'information700'
  | 'information800'
  | 'overlayVariant2'
  | 'information900'
  | 'quatreFade'
  | 'orange';

export type ColorDefinitions = {[key in ColorKeys]: string};

export const LIGHT_COLORS: ColorDefinitions = {
  background: '#fff',
  overlay: 'rgba(0,0,0,.8)',
  overlayVariant2: 'rgba(0,0,0,.9)',

  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',

  primary25: '#D0D1FB',
  primary50: '#E6E8EB',
  primary100: '#8585BE',
  primary200: '#5C5DA8',
  primary300: '#343493',
  primary400: '#0B0C7D',
  primary500: '#0000CC',
  primary600: '#070853',
  primary700: '#05063E',
  primary800: '#04042A',
  primary900: '#020219',

  secondary25: '#FFEEDB',
  secondary50: '#FFEFDB',
  secondary100: '#FFB255',
  secondary200: '#FFB255',
  secondary300: '#FF9E2A',
  secondary400: '#FF8B00',
  secondary500: '#D47400',
  secondary600: '#AA5D00',
  secondary700: '#804500',
  secondary800: '#552E00',
  secondary900: '#331C00',

  neutral25: '#F9F9FA',
  neutral50: '#EFF1F4',
  neutral100: '#DFE2E9',
  neutral200: '#CDD8F3',
  neutral300: '#BFC0C3',
  neutral400: '#B2B4B7',
  neutral500: '#ACACAC',
  neutral600: '#77787A',
  neutral700: '#595A5B',
  neutral800: '#3B3C3D',
  neutral900: '#242425',

  success25: '#E2F8EB',
  success50: '#BFE7D0',
  success100: '#9FDBB8',
  success200: '#7FCFA1',
  success300: '#5FC389',
  success400: '#3FB772',
  success500: '#34985F',
  success600: '#27AE60',
  success700: '#1F5B39',
  success800: '#153D26',
  success900: '#0D2517',

  danger25: '#FFDBDB',
  danger50: '#FFC4C4',
  danger100: '#FFA6A6',
  danger200: '#FF8888',
  danger300: '#FF4D4D',
  danger400: '#FF2C2C',
  danger500: '#D44040',
  danger600: '#AA3333',
  danger700: '#802626',
  danger800: '#551A1A',
  danger900: '#330F0F',

  alert25: '#FFF6DB',
  alert50: '#FCE7AA',
  alert100: '#FADB80',
  alert200: '#F8D055',
  alert300: '#F7C42A',
  alert400: '#F5B800',
  alert500: '#CC9900',
  alert600: '#A37B00',
  alert700: '#7A5C00',
  alert800: '#523D00',
  alert900: '#312500',

  waiting25: '#EFDBFF',
  waiting50: '#E0B9FF',
  waiting100: '#D095FF',
  waiting200: '#C172FF',
  waiting300: '#B14FFF',
  waiting400: '#A22CFF',
  waiting500: '#8725D4',
  waiting600: '#6C1DAA',
  waiting700: '#511680',
  waiting800: '#360F55',
  waiting900: '#200933',

  text25: '#DEE7FC',
  text50: '#A6AFC2',
  text100: '#7A90C2',
  text200: '#58627A',
  text300: '#677597',
  text400: '#051438',
  text500: '#04112F',
  text600: '#030D25',
  text700: '#020A1C',
  text800: '#020713',
  text900: '#01040B',

  default25: '#FBFCFE',
  default50: '#F9FAFD',
  default100: '#F6F7FB',
  default200: '#F3F5FA',
  default300: '#D7E3FC',
  default400: '#EDF0F8',
  default500: '#CFCFCF',
  default600: '#8E8FA7',
  default700: '#76787C',
  default800: '#4F5053',
  default900: '#2F3032',

  information25: '#D4E1FA',
  information50: '#B7CDF7',
  information100: '#93B4F3',
  information200: '#709BF0',
  information300: '#4C82EC',
  information400: '#2869E8',
  information500: '#2157C1',
  information600: '#1B469B',
  information700: '#143474',
  information800: '#0D234D',
  information900: '#08152E',
  quatreFade: '#EFF1F4',
  orange: '#FF8B00',
} as const;

export const DARK_COLORS: ColorDefinitions = {
  background: '#000',
  overlay: 'rgba(0,0,0,.8)',
  overlayVariant2: 'rgba(0,0,0,.9)',
  transparent: 'transparent',

  white: '#FFFFFF',
  black: '#000000',

  primary25: '#D0D1FB',
  primary50: '#E6E8EB',
  primary100: '#8585BE',
  primary200: '#5C5DA8',
  primary300: '#343493',
  primary400: '#0B0C7D',
  primary500: '#0000CC',
  primary600: '#070853',
  primary700: '#05063E',
  primary800: '#04042A',
  primary900: '#020219',

  secondary25: '#FFEEDB',
  secondary50: '#FFEFDB',
  secondary100: '#FFB255',
  secondary200: '#FFB255',
  secondary300: '#FF9E2A',
  secondary400: '#FF8B00',
  secondary500: '#D47400',
  secondary600: '#AA5D00',
  secondary700: '#804500',
  secondary800: '#552E00',
  secondary900: '#331C00',

  neutral25: '#F9F9FA',
  neutral50: '#EFF1F4',
  neutral100: '#DFE2E9',
  neutral200: '#CDD8F3',
  neutral300: '#BFC0C3',
  neutral400: '#B2B4B7',
  neutral500: '#ACACAC',
  neutral600: '#77787A',
  neutral700: '#595A5B',
  neutral800: '#3B3C3D',
  neutral900: '#242425',

  success25: '#E2F8EB',
  success50: '#BFE7D0',
  success100: '#9FDBB8',
  success200: '#7FCFA1',
  success300: '#5FC389',
  success400: '#3FB772',
  success500: '#34985F',
  success600: '#27AE60',
  success700: '#1F5B39',
  success800: '#153D26',
  success900: '#0D2517',

  danger25: '#FFDBDB',
  danger50: '#FFC4C4',
  danger100: '#FFA6A6',
  danger200: '#FF8888',
  danger300: '#FF4D4D',
  danger400: '#FF2C2C',
  danger500: '#D44040',
  danger600: '#AA3333',
  danger700: '#802626',
  danger800: '#551A1A',
  danger900: '#330F0F',

  alert25: '#FFF6DB',
  alert50: '#FCE7AA',
  alert100: '#FADB80',
  alert200: '#F8D055',
  alert300: '#F7C42A',
  alert400: '#F5B800',
  alert500: '#CC9900',
  alert600: '#A37B00',
  alert700: '#7A5C00',
  alert800: '#523D00',
  alert900: '#312500',

  waiting25: '#EFDBFF',
  waiting50: '#E0B9FF',
  waiting100: '#D095FF',
  waiting200: '#C172FF',
  waiting300: '#B14FFF',
  waiting400: '#A22CFF',
  waiting500: '#8725D4',
  waiting600: '#6C1DAA',
  waiting700: '#511680',
  waiting800: '#360F55',
  waiting900: '#200933',

  text25: '#DEE7FC',
  text50: '#A6AFC2',
  text100: '#7A90C2',
  text200: '#58627A',
  text300: '#677597',
  text400: '#051438',
  text500: '#04112F',
  text600: '#030D25',
  text700: '#020A1C',
  text800: '#020713',
  text900: '#01040B',

  default25: '#FBFCFE',
  default50: '#F9FAFD',
  default100: '#F6F7FB',
  default200: '#F3F5FA',
  default300: '#D7E3FC',
  default400: '#EDF0F8',
  default500: '#CFCFCF',
  default600: '#8E8FA7',
  default700: '#76787C',
  default800: '#4F5053',
  default900: '#2F3032',

  information25: '#D4E1FA',
  information50: '#B7CDF7',
  information100: '#93B4F3',
  information200: '#709BF0',
  information300: '#4C82EC',
  information400: '#2869E8',
  information500: '#2157C1',
  information600: '#1B469B',
  information700: '#143474',
  information800: '#0D234D',
  information900: '#08152E',
  quatreFade: '#EFF1F4',
  orange: '#FF8B00',
} as const;
