import {FunctionComponent} from 'react';

export interface TabConfig {
  name: string;
  component: FunctionComponent;
  Icon: FunctionComponent;
  label: string;
  disabled?: boolean;
}
