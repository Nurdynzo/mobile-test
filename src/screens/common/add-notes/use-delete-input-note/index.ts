import {showToast} from '@/components/app-toast';
import {useApiServicesAppInputnotesDeletecreateinputnotesDeleteMutation} from '@/state/services/inputNotesApi';

export const useDeleteInputNote = ({
  patientFullName,
}: {
  patientFullName: string;
}) => {
  const [deleteNote, {isLoading: isDeletingNote, isSuccess, isError}] =
    useApiServicesAppInputnotesDeletecreateinputnotesDeleteMutation();

  const handleDeleteNote = async (inputNotesId: number | undefined) => {
    if (inputNotesId) {
      try {
        await deleteNote({
          inputNotesId,
        }).unwrap();
        showToast('SUCCESS', {
          title: 'Note deleted sucessfully',
          message: `${patientFullName} note has been deleted from our records`,
        });
      } catch (error) {
        showToast('ERROR', {
          title: 'Delete Note Error Encountered!',
          message: `${patientFullName} note failed to be deleted from our records`,
        });
      }
    }
  };

  return {
    isError,
    isSuccess,
    isDeletingNote,
    handleDeleteNote,
  };
};
