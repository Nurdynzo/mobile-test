import {MoreVitalTypes, VitalTypes} from '@/screens/common/vital-signs/type';

export const heartRateOptions = [
  {item: {value: 'Brachial', label: 'Brachial', id: 1}},
  {item: {value: 'Heart', label: 'Heart', id: 2}},
];
export const heightOptions = [
  {item: {value: 'Standing', label: 'Standing', id: 1}},
  {item: {value: 'Lying', label: 'Lying', id: 2}},
];
export const temperatureOptions = [
  {item: {value: 'Axillary', label: 'Axillary', id: 1}},
  {item: {value: 'Oral', label: 'Oral', id: 2}},
];

export const allVitals = [
  {
    item: {
      value: 'Occipitofrontal circumference (OFC)',
      label: 'Occipitofrontal circumference (OFC)',
      id: 1,
    },
  },
  {
    item: {
      value: 'Mid-upper arm circumference (MUAC)',
      label: 'Mid-upper arm circumference (MUAC)',
      id: 2,
    },
  },
];
export const suggestedVitals = [
  {
    item: {
      value: 'Occipitofrontal circumference (OFC)',
      label: 'Occipitofrontal circumference (OFC)',
      id: 1,
    },
  },
  {
    item: {
      value: 'Mid-upper arm circumference (MUAC)',
      label: 'Mid-upper arm circumference (MUAC)',
      id: 2,
    },
  },
];
export const spo2Options = [
  {item: {value: 'Room air', label: 'Room air', id: 1}},
  {
    item: {
      value: 'O2 via nasal cannula ',
      label: 'O2 via nasal cannula ',
      id: 2,
    },
  },
];

export const extraMenu = [
  {item: {id: '2', value: 'Recheck'}},
  {item: {id: '3', value: 'Link to care plan'}},
  {item: {id: '4', value: 'Link to event'}},
  {item: {id: '5', value: 'Link to examination'}},
  {item: {id: '6', value: 'Highlight for attention'}},
  {item: {id: '1', value: 'Delete', color: 'danger300'}},
];

export const eyes = [
  {
    text: 'opening eyes',
    score: 1,
  },
  {
    text: 'Close eyes',
    score: 2,
  },
  {
    text: 'frank eyes',
    score: 4,
  },
];

export type vitalsArrayTitle =
  | 'Resp rate'
  | 'Heart rate'
  | 'Height'
  | 'Weight'
  | 'BP Sys'
  | 'BP Dias'
  | 'Temperature'
  | 'SPO2'
  | 'BMI'
  | 'GCS score'
  | 'BGL';

export const vitalsArray: Array<VitalTypes> = [
  {
    title: 'Resp rate',
    value: 0,
    hasToggle: true,
    name: 'cpm',
  },
  {
    title: 'Heart rate',
    value: 0,
    name: 'bpm',
    hasToggle: true,
    hasDropDown: true,
  },
  {
    title: 'Height',
    value: 0,
    name: 'cm',
    hasDropDown: true,
  },
  {
    title: 'Weight',
    value: 0,
    name: 'kg',
  },
  {
    title: 'BP Sys',
    value: 0,
    name: 'mmHg',
    hasToggle: true,
  },
  {
    title: 'BP Dias',
    value: 0,
    name: 'mmHg',
  },
  {
    title: 'Temperature',
    value: 0,
    name: '°C',
    hasDropDown: true,
  },
  {
    title: 'SPO2',
    value: 0,
    name: '%',
    hasDropDown: true,
  },
  {
    title: 'BMI',
    value: 0,
    name: 'kg/m2',
  },
  {
    title: 'GCS score',
    value: 0,
    name: 'mg/dL',
  },
  {
    title: 'BGL',
    value: 0,
    name: 'mg/dL',
    hasBorder: false,
  },
];

export type moreVitalsTitle = 'OFC' | 'MUAC' | 'Fetal heart rate';

export const moreVitalsArray: Array<MoreVitalTypes> = [
  {
    title: 'OFC',
    value: 0,
    name: 'cm',
  },
  {
    title: 'MUAC',
    value: 0,
    name: 'cm',
    hasToggle: true,
    hasDropDown: true,
  },
  {
    title: 'Fetal heart rate',
    value: 0,
    name: 'bpm',
    hasToggle: true,
    hasDropDown: true,
    hasBorder: false,
  },
];
