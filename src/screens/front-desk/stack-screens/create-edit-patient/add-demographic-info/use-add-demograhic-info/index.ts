import {addNewPatientFormSchema} from '@/components/forms/patient-form/schema';
import {onPatientSubmit} from '@/components/forms/patient-form/types';
import {FrontDeskNavigationProps} from '@/navigation/front-desk/root-navigation/type';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {
  useCreateEditPatient,
  useUploadPatientProfile,
  useUploadPatientReferralLetter,
} from '../../common';

export const useAddDemographicInfo = ({
  defaultValues,
  patientId,
}: {
  defaultValues: addNewPatientFormSchema;
  patientId: number;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigation =
    useNavigation<FrontDeskNavigationProps<'FD_ADD_DEMOGRAPHIC_INFO'>>();
  const {handleCreatePatient, isSuccess: isCreatePatientSuccess} =
    useCreateEditPatient();
  const {
    handleUploadPatientProfilePicture,
    isSuccess: isUploadPatientProfilePictureSuccess,
  } = useUploadPatientProfile();
  const {handleUploadReferralLetter, isSuccess: isUploadReferralLetterSuccess} =
    useUploadPatientReferralLetter();

  const _handleSubmit = async (props: onPatientSubmit) => {
    setIsLoading(true);
    const {data, reset} = props;
    const response = await handleCreatePatient(data, patientId);
    if (data.image?.path !== defaultValues.image?.path) {
      await handleUploadPatientProfilePicture({data, response});
    }
    await handleUploadReferralLetter({data, response});
    if (response) {
      navigation.goBack();
      reset();
    }
    setIsLoading(false);
  };

  return {
    _handleSubmit,
    isLoading,
    isCreatePatientSuccess,
    isUploadPatientProfilePictureSuccess,
    isUploadReferralLetterSuccess,
  };
};
