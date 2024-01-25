import {
  BiologyShapeIcon,
  HandicapIcon,
  HeartBlackShapeIcon,
  MedicalNotesIcon,
  MedicalResultsFolderIcon,
  MedicalSamplesIcon,
  MedicalSignIcon,
  NurseIcon,
  TreatmentPlanIcon,
} from '@/assets/svg';
import React from 'react';
import {SvgProps} from 'react-native-svg';

export type PatientProfileModalMenuItemType = {
  label: string;
  icon: React.FC<SvgProps>;
};

export const generalPatientProfileModalMenuItems: PatientProfileModalMenuItemType[] =
  [
    {
      label: 'Patient Overview',
      icon: MedicalSignIcon,
    },
    {
      label: 'Vital signs',
      icon: HeartBlackShapeIcon,
    },
    {
      label: 'Clinical investigations',
      icon: MedicalSamplesIcon,
    },
    {
      label: 'Treatment plans',
      icon: TreatmentPlanIcon,
    },
    {
      label: 'Chronic conditions',
      icon: HandicapIcon,
    },
    {
      label: 'Nursing records',
      icon: NurseIcon,
    },
    {
      label: 'Ward round & Clinic notes',
      icon: MedicalNotesIcon,
    },
    {
      label: 'Allergy history',
      icon: BiologyShapeIcon,
    },
    {
      label: 'Review detailed history',
      icon: MedicalResultsFolderIcon,
    },
  ];
