import DateRange from '@/types/dateRange';

export type AppointmentDateRangerPickerType = {
  onOverlayTap: () => void;
  show: boolean;
  from?: Date | string | null;
  to?: Date | string | null;
  onChangeFrom?: (from: Date | string | null) => void;
  onChangeTo?: (to: Date | string | null) => void;
  onCancel: () => void;
  onDone: (result: DateRange) => void;
  mode?: 'time' | 'date';
};
