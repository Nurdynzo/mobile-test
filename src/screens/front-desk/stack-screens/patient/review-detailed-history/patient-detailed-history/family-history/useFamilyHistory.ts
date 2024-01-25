import {
  CreateOrEditPatientDto,
  GenderType,
  useApiServicesAppPatientsCreateoreditPostMutation,
} from '@/state/services/patientApi';
import {EMPTY_STRING} from '@/utils/constants';
import {otherIdNumberFormSchema} from '@/utils/schema';
import {
  EditFamilyHistoryFormSchema,
  editFamilyHistoryFormSchema,
} from './shema';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {logThis} from '@/utils/helpers/logThis';
import {showToast} from '@/components/app-toast';
import {getErrorMessage} from '@/utils/helpers';
export const defaultOtherIdNumberValues: otherIdNumberFormSchema = {
  type: EMPTY_STRING,
  number: EMPTY_STRING,
};
export const useFamilyHistory = ({
  patientData,
  onClose = () => null,
}: {
  patientData: CreateOrEditPatientDto | undefined;
  onClose?: () => void;
}) => {
  const defaultValues = {
    noOfMaleChildren: `${patientData?.noOfMaleChildren ?? EMPTY_STRING}`,
    noOfFemaleChildren: `${patientData?.noOfFemaleChildren ?? EMPTY_STRING}`,
    noOfMaleSiblings: `${patientData?.noOfMaleSiblings ?? EMPTY_STRING}`,
    noOfFemaleSiblings: `${patientData?.noOfFemaleSiblings ?? EMPTY_STRING}`,
    members: patientData?.relations?.map(el => ({
      isAlive: el.isAlive,
      ...(el.ageAtDiagnosis && {ageAtDiagnosis: `${el?.ageAtDiagnosis}`}),
      ...(el.ageAtDeath && {ageOfDeath: `${el?.ageAtDeath}`}),
      relationship: el.relationship,
      causeOfDeath: (el?.diagnoses ?? [])
        ?.filter(eItem => eItem.isCauseOfDeath)
        .map(eItem => ({
          id: eItem.sctId as string,
          name: eItem.name as string,
        })),
      seriousIllnesses: (el?.diagnoses ?? [])
        ?.filter(eItem => !eItem.isCauseOfDeath)
        .map(eItem => ({
          id: eItem.sctId as string,
          name: eItem.name as string,
        })),
    })),
  };

  const {control, reset, handleSubmit} = useForm<EditFamilyHistoryFormSchema>({
    defaultValues,
    resolver: zodResolver(editFamilyHistoryFormSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const [updateFamilyHistory, {isLoading}] =
    useApiServicesAppPatientsCreateoreditPostMutation();

  const submit = async (values: EditFamilyHistoryFormSchema) => {
    try {
      const response = await updateFamilyHistory({
        createOrEditPatientDto: {
          id: patientData?.id as number,
          patientCode: patientData?.patientCode as string,
          firstName: patientData?.firstName as string,
          lastName: patientData?.lastName as string,
          phoneNumber: patientData?.phoneNumber as string,
          dateOfBirth: patientData?.dateOfBirth as string,
          genderType: patientData?.genderType as GenderType,
          noOfMaleChildren: Number(values.noOfMaleChildren),
          noOfFemaleChildren: Number(values.noOfFemaleChildren),
          noOfMaleSiblings: Number(values.noOfMaleSiblings),
          noOfFemaleSiblings: Number(values.noOfFemaleSiblings),
          // TODO(Franklyn): family members not added yet bcos of a blocker from backend
        },
      }).unwrap();
      if (response) {
        showToast('SUCCESS', {
          title: 'Familly history updated successfully',
          message: `${response?.firstName} ${response?.lastName} family history record has been updated`,
        });
        reset();
        onClose();
      }
    } catch (error) {
      logThis('Family history Update error===', error);
      showToast('ERROR', {
        title: 'Familly history update Error Encountered!',
        message: getErrorMessage(error),
      });
    }
  };
  return {_handleSubmit: handleSubmit(submit), isLoading, control};
};
