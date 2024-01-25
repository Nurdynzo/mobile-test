import File from '@/types/file';
import {getFormData} from '@/utils/helpers/getFormData';
import {baseApi as api} from './baseApi';
import {
  ApiServicesAppPatientdocumentuploadUploadpicturePostApiResponse,
  ApiServicesAppPatientdocumentuploadUploadreferralletterfilePostApiResponse,
} from './patientApi';
import {ApiServicesAppPatientdocumentuploadUploadscandocumentPostApiResponse} from './patientDocumentUploadApi';

const injectedRtkApi = api.injectEndpoints({
  overrideExisting: false,
  endpoints: build => ({
    apiServicesAppUploadPatientScannedDocumentPost: build.mutation<
      ApiServicesAppPatientdocumentuploadUploadscandocumentPostApiResponse,
      ApiServicesAppUploadPatientScannedDocumentArg
    >({
      query: queryArg => {
        return {
          url: `/api/services/app/PatientDocumentUpload/UploadScanDocument`,
          method: 'POST',
          body: getFormData(queryArg.body),
          formData: true,
        };
      },
    }),
    apiServicesAppUploadpatientpicturePost: build.mutation<
      ApiServicesAppPatientdocumentuploadUploadpicturePostApiResponse,
      ApiServicesAppPatientdocumentuploadUploadpicturePostApiArg
    >({
      query: queryArg => ({
        url: `/api/services/app/PatientDocumentUpload/UploadPicture`,
        method: 'POST',
        body: getFormData(queryArg.body),
        formData: true,
      }),
    }),
    apiServicesAppUploadreferralletterfilePost: build.mutation<
      ApiServicesAppPatientdocumentuploadUploadreferralletterfilePostApiResponse,
      ApiServicesAppPatientdocumentuploadUploadreferralletterfilePostApiArg
    >({
      query: queryArg => {
        return {
          url: `/api/services/app/PatientDocumentUpload/UploadReferralLetterFile`,
          method: 'POST',
          body: getFormData(queryArg.body),
          formData: true,
        };
      },
    }),
  }),
});

export type ApiServicesAppUploadPatientScannedDocumentArg = {
  body: {
    FileId?: string;
    File: File;
    IsUpdate?: boolean;
    Id?: number;
  };
};

export type ApiServicesAppPatientdocumentuploadUploadpicturePostApiArg = {
  body: {
    File?: File;
    PatientId?: number;
  };
};

export type ApiServicesAppPatientdocumentuploadUploadreferralletterfilePostApiArg =
  {
    body: {
      ReferringHealthCareProvider?: string;
      DiagnosisSummary?: string;
      FileId?: string;
      File: File;
      PatientId: number;
      AppointmentId?: number;
      Id?: number;
    };
  };

export {injectedRtkApi as customApi};

export const {
  useApiServicesAppUploadPatientScannedDocumentPostMutation,
  useApiServicesAppUploadpatientpicturePostMutation,
  useApiServicesAppUploadreferralletterfilePostMutation,
} = injectedRtkApi;
