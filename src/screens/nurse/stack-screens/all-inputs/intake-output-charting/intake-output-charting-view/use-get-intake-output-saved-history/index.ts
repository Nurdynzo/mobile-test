import {useApiServicesAppIntakeoutputGetintakeoutputsavedhistoryGetQuery} from '@/state/services/intakeOutputApi';

export const useGetIntakeOutputSavedHistory = ({
  patientId,
  type,
}: {
  patientId: number;
  type: 'Intake' | 'Output';
}) => {
  const props =
    useApiServicesAppIntakeoutputGetintakeoutputsavedhistoryGetQuery(
      {
        patientId,
      },
      {
        selectFromResult: ({data, ...rest}) => ({
          data: (
            data?.filter(
              el => el.chartingTypeText === type && el.suggestedText,
            ) || []
          ).flatMap(el => el.suggestedText || []),
          ...rest,
        }),
        skip: !type,
      },
    );

  return props;
};
