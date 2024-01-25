import {MenuOptionsProp} from '@/types/menusheet';

export const tabViewsList: string[] = ['Outpatient', 'Inpatient', 'A&E'];
export const diagnosisTabViewsList: string[] = ['Diagnosis', 'Differential'];

export const sortByOptions: MenuOptionsProp = [
  {label: 'Today', value: 'Name asc'},
  {label: 'Patient name Z-A', value: 'Name desc'},
  {label: 'Time in: Earliest', value: 'StartTime asc'},
  {label: 'Time in: Latest', value: 'StartTime desc'},
  {label: 'Age: Youngest', value: 'DateOfBirth desc'},
  {label: 'Age: Oldest', value: 'DateOfBirth asc'},
];
export const dateFilterOptions: MenuOptionsProp = [
  {label: 'Today', value: 'Today'},
  {label: 'This week', value: 'This week'},
  {label: 'This month', value: 'This month'},
  {label: 'This year', value: 'This year'},
  {label: 'Custom Date', value: 'Custom Date'},
];
