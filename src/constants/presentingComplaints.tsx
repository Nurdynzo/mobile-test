import React from 'react';
import {
  SiteView,
  OnsetView,
  CharacterView,
  RadiationView,
  AssociationsView,
  TimeCourseView,
  ExacerbatingView,
  SeverityView,
} from '@/screens/doctor/stack-screens/allInputs/presenting-complaints/suggestion-selection/socrates/index';

export const socratesTabLabels: string[] = [
  'S',
  'O',
  'C',
  'R',
  'A',
  'T',
  'E',
  'S',
];

type socratesViewType = {
  title: string;
  view: JSX.Element;
};

export const socratesViewItems: socratesViewType[] = [
  {
    title: 'Site',
    view: <SiteView />,
  },
  {
    title: 'Onset',
    view: <OnsetView />,
  },
  {
    title: 'Character',
    view: <CharacterView />,
  },
  {
    title: 'Radiation',
    view: <RadiationView />,
  },
  {
    title: 'Association',
    view: <AssociationsView />,
  },
  {
    title: 'Time course',
    view: <TimeCourseView />,
  },
  {
    title: 'Exacerbating/relieving factors',
    view: <ExacerbatingView />,
  },
  {
    title: 'Severity',
    view: <SeverityView />,
  },
];
