import {SummaryMenuForRecordsTypes} from '@/screens/common/investigations/types';

export const recentResultsTabsForInvestigations = [
  {
    key: 'Heamatology',
    title: 'Heamatology',
  },
  {
    key: 'Chemistry',
    title: 'Chemistry',
  },
  {
    key: 'Microbiology',
    title: 'Microbiology',
  },
];

export const tabsForInvestigations = [
  'Recent results',
  'Request investigations',
  'Record Investigations',
];

export const summaryMenuForInvestigations: Array<SummaryMenuForRecordsTypes> = [
  {
    item: {
      value: 'View related images',
      label: 'View related images',
      id: 1,
    },
  },
  {
    item: {
      value: 'Link to care plan',
      label: 'Link to care plan',
      id: 2,
    },
  },
  {
    item: {
      value: 'Link to event',
      label: 'Link to event',
      id: 4,
    },
  },
  {
    item: {
      value: 'Link to examination',
      label: 'Link to examination',
      id: 5,
    },
  },
  {
    item: {
      value: 'Highlight for attention',
      label: 'Highlight for attention',
      id: 6,
    },
  },

  {
    item: {
      value: 'Delete',
      label: 'Delete',
      id: 7,
      color: 'danger100',
    },
  },
];
