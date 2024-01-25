import {showToast} from '@/components/app-toast';
import {useApiServicesAppInputnotesCreateinputnotesPostMutation} from '@/state/services/inputNotesApi';
import {SnowstormSimpleResponseDto} from '@/state/services/snowstorm';

export const useSaveInputNote = ({
  patientFullName,
  patientId,
  appointmentId,
}: {
  patientId: number;
  appointmentId: number;
  patientFullName: string;
}) => {
  const [
    createInputNote,
    {isLoading: isCreateNoteLoading, isError, isSuccess},
  ] = useApiServicesAppInputnotesCreateinputnotesPostMutation();

  const handleSave = async ({
    selectedItems,
    reset,
  }: {
    selectedItems: SnowstormSimpleResponseDto[];
    reset: () => void;
  }) => {
    if (selectedItems.length) {
      try {
        await createInputNote({
          createInputNotesDto: {
            patientId,
            appointmentId: appointmentId,
            description: selectedItems.map(p => p.name).join(', '),
          },
        }).unwrap();
        showToast('SUCCESS', {
          title: 'Note added sucessfully',
          message: `${patientFullName} note has been added to our records`,
        });

        reset();
      } catch (error) {
        showToast('ERROR', {
          title: 'Add Note Error Encountered!',
          message: `${patientFullName} note failed to be added to our records`,
        });
      }
    }
  };

  return {
    isCreateNoteLoading,
    handleSave,
    isError,
    isSuccess,
  };
};
