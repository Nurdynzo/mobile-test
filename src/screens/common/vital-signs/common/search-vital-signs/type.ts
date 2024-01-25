import VoidFunction from '@/types/voidfunction';
import {MoreVitalTypes} from '../../type';
import {ColorDefinitions} from '@/resources/colors';

export interface MoreVitalSignsItemProps {
  item: MoreVitalTypes;
  openHeartRateSheet: VoidFunction;
  colors: ColorDefinitions;
  index: number;
}
