import {baseApi as api} from './baseApi';
const injectedRtkApi = api.injectEndpoints({
  endpoints: build => ({
    apiServicesAppPatientdocumentuploadUploadreferralletterfilePost:
      build.mutation<
        ApiServicesAppPatientdocumentuploadUploadreferralletterfilePostApiResponse,
        ApiServicesAppPatientdocumentuploadUploadreferralletterfilePostApiArg
      >({
        query: queryArg => ({
          url: `/api/services/app/PatientDocumentUpload/UploadReferralLetterFile`,
          method: 'POST',
          body: queryArg.body,
        }),
      }),
    apiServicesAppPatientdocumentuploadUploadpicturePost: build.mutation<
      ApiServicesAppPatientdocumentuploadUploadpicturePostApiResponse,
      ApiServicesAppPatientdocumentuploadUploadpicturePostApiArg
    >({
      query: queryArg => ({
        url: `/api/services/app/PatientDocumentUpload/UploadPicture`,
        method: 'POST',
        body: queryArg.body,
      }),
    }),
    apiServicesAppPatientdocumentuploadAssignuploadedfilestoreviewerPost:
      build.mutation<
        ApiServicesAppPatientdocumentuploadAssignuploadedfilestoreviewerPostApiResponse,
        ApiServicesAppPatientdocumentuploadAssignuploadedfilestoreviewerPostApiArg
      >({
        query: queryArg => ({
          url: `/api/services/app/PatientDocumentUpload/AssignUploadedFilesToReviewer`,
          method: 'POST',
          body: queryArg.body,
          params: {reviewerId: queryArg.reviewerId},
        }),
      }),
    apiServicesAppPatientdocumentuploadReviewscanneddocumentPost:
      build.mutation<
        ApiServicesAppPatientdocumentuploadReviewscanneddocumentPostApiResponse,
        ApiServicesAppPatientdocumentuploadReviewscanneddocumentPostApiArg
      >({
        query: queryArg => ({
          url: `/api/services/app/PatientDocumentUpload/ReviewScannedDocument`,
          method: 'POST',
          body: queryArg.body,
        }),
      }),
    apiServicesAppPatientdocumentuploadGetrejectedscanneddocumentsforreviewGet:
      build.query<
        ApiServicesAppPatientdocumentuploadGetrejectedscanneddocumentsforreviewGetApiResponse,
        ApiServicesAppPatientdocumentuploadGetrejectedscanneddocumentsforreviewGetApiArg
      >({
        query: () => ({
          url: `/api/services/app/PatientDocumentUpload/GetRejectedScannedDocumentsForReview`,
        }),
      }),
    apiServicesAppPatientdocumentuploadGetdocumentbyidGet: build.query<
      ApiServicesAppPatientdocumentuploadGetdocumentbyidGetApiResponse,
      ApiServicesAppPatientdocumentuploadGetdocumentbyidGetApiArg
    >({
      query: queryArg => ({
        url: `/api/services/app/PatientDocumentUpload/GetDocumentById`,
        params: {fileId: queryArg.fileId},
      }),
    }),
    apiServicesAppPatientdocumentuploadGetpublicdocumenturlGet: build.query<
      ApiServicesAppPatientdocumentuploadGetpublicdocumenturlGetApiResponse,
      ApiServicesAppPatientdocumentuploadGetpublicdocumenturlGetApiArg
    >({
      query: queryArg => ({
        url: `/api/services/app/PatientDocumentUpload/GetPublicDocumentUrl`,
        params: {fileId: queryArg.fileId},
      }),
    }),
    apiServicesAppPatientdocumentuploadGetdocumentinbasestringbyidGet:
      build.query<
        ApiServicesAppPatientdocumentuploadGetdocumentinbasestringbyidGetApiResponse,
        ApiServicesAppPatientdocumentuploadGetdocumentinbasestringbyidGetApiArg
      >({
        query: queryArg => ({
          url: `/api/services/app/PatientDocumentUpload/GetDocumentInBaseStringById`,
          params: {fileId: queryArg.fileId},
        }),
      }),
    apiServicesAppPatientdocumentuploadUploadscandocumentPost: build.mutation<
      ApiServicesAppPatientdocumentuploadUploadscandocumentPostApiResponse,
      ApiServicesAppPatientdocumentuploadUploadscandocumentPostApiArg
    >({
      query: queryArg => ({
        url: `/api/services/app/PatientDocumentUpload/UploadScanDocument`,
        method: 'POST',
        body: queryArg.body,
      }),
    }),
    apiServicesAppPatientdocumentuploadGetscanneddocumentsforreviewGet:
      build.query<
        ApiServicesAppPatientdocumentuploadGetscanneddocumentsforreviewGetApiResponse,
        ApiServicesAppPatientdocumentuploadGetscanneddocumentsforreviewGetApiArg
      >({
        query: queryArg => ({
          url: `/api/services/app/PatientDocumentUpload/GetScannedDocumentsForReview`,
          params: {
            showOnlyRejectedDocuments: queryArg.showOnlyRejectedDocuments,
          },
        }),
      }),
    apiServicesAppPatientdocumentuploadGetscanneddocumentsbypatientcodeGet:
      build.query<
        ApiServicesAppPatientdocumentuploadGetscanneddocumentsbypatientcodeGetApiResponse,
        ApiServicesAppPatientdocumentuploadGetscanneddocumentsbypatientcodeGetApiArg
      >({
        query: queryArg => ({
          url: `/api/services/app/PatientDocumentUpload/GetScannedDocumentsByPatientCode`,
          params: {patientCode: queryArg.patientCode},
        }),
      }),
    apiServicesAppPatientdocumentuploadGetlistofreviewerforscanneddocumentGet:
      build.query<
        ApiServicesAppPatientdocumentuploadGetlistofreviewerforscanneddocumentGetApiResponse,
        ApiServicesAppPatientdocumentuploadGetlistofreviewerforscanneddocumentGetApiArg
      >({
        query: () => ({
          url: `/api/services/app/PatientDocumentUpload/GetListOfReviewerForScannedDocument`,
        }),
      }),
  }),
  overrideExisting: false,
});
export {injectedRtkApi as patientDocumentUploadApi};
export type ApiServicesAppPatientdocumentuploadUploadreferralletterfilePostApiResponse =
  /** status 200 Success */ ReferralLetterUploadRequest;
export type ApiServicesAppPatientdocumentuploadUploadreferralletterfilePostApiArg =
  {
    body: {
      ReferringHealthCareProvider?: string;
      DiagnosisSummary?: string;
      FileId?: string;
      File: Blob;
      PatientId: number;
      AppointmentId?: number;
      Id?: number;
    };
  };
export type ApiServicesAppPatientdocumentuploadUploadpicturePostApiResponse =
  unknown;
export type ApiServicesAppPatientdocumentuploadUploadpicturePostApiArg = {
  body: {
    File?: Blob;
    PatientId?: number;
  };
};
export type ApiServicesAppPatientdocumentuploadAssignuploadedfilestoreviewerPostApiResponse =
  unknown;
export type ApiServicesAppPatientdocumentuploadAssignuploadedfilestoreviewerPostApiArg =
  {
    reviewerId?: number;
    body: number[];
  };
export type ApiServicesAppPatientdocumentuploadReviewscanneddocumentPostApiResponse =
  unknown;
export type ApiServicesAppPatientdocumentuploadReviewscanneddocumentPostApiArg =
  {
    body: {
      File: Blob;
      FileId: string;
      IsApproved: boolean;
      ReviewNote?: string;
      Id?: number;
    };
  };
export type ApiServicesAppPatientdocumentuploadGetrejectedscanneddocumentsforreviewGetApiResponse =
  /** status 200 Success */ GetScannedDocumentsForReviewResponse[];
export type ApiServicesAppPatientdocumentuploadGetrejectedscanneddocumentsforreviewGetApiArg =
  void;
export type ApiServicesAppPatientdocumentuploadGetdocumentbyidGetApiResponse =
  unknown;
export type ApiServicesAppPatientdocumentuploadGetdocumentbyidGetApiArg = {
  fileId?: string;
};
export type ApiServicesAppPatientdocumentuploadGetpublicdocumenturlGetApiResponse =
  /** status 200 Success */ string;
export type ApiServicesAppPatientdocumentuploadGetpublicdocumenturlGetApiArg = {
  fileId?: string;
};
export type ApiServicesAppPatientdocumentuploadGetdocumentinbasestringbyidGetApiResponse =
  /** status 200 Success */ string;
export type ApiServicesAppPatientdocumentuploadGetdocumentinbasestringbyidGetApiArg =
  {
    fileId?: string;
  };
export type ApiServicesAppPatientdocumentuploadUploadscandocumentPostApiResponse =
  /** status 200 Success */ PatientScanDocumentUploadRequest;
export type ApiServicesAppPatientdocumentuploadUploadscandocumentPostApiArg = {
  body: {
    FileId?: string;
    File: Blob;
    IsUpdate?: boolean;
    Id?: number;
  };
};
export type ApiServicesAppPatientdocumentuploadGetscanneddocumentsforreviewGetApiResponse =
  /** status 200 Success */ GetScannedDocumentsForReviewResponse[];
export type ApiServicesAppPatientdocumentuploadGetscanneddocumentsforreviewGetApiArg =
  {
    showOnlyRejectedDocuments?: boolean;
  };
export type ApiServicesAppPatientdocumentuploadGetscanneddocumentsbypatientcodeGetApiResponse =
  /** status 200 Success */ string[];
export type ApiServicesAppPatientdocumentuploadGetscanneddocumentsbypatientcodeGetApiArg =
  {
    patientCode?: string;
  };
export type ApiServicesAppPatientdocumentuploadGetlistofreviewerforscanneddocumentGetApiResponse =
  /** status 200 Success */ ScannedDocumentReviewerQueryResponse[];
export type ApiServicesAppPatientdocumentuploadGetlistofreviewerforscanneddocumentGetApiArg =
  void;
export type ReferralLetterUploadRequest = {
  referringHealthCareProvider?: string | null;
  diagnosisSummary?: string | null;
  fileId?: string | null;
  file: Blob;
  patientId: number;
  appointmentId?: number | null;
  id?: number | null;
};
export type GetScannedDocumentsForReviewResponse = {
  patientFullName?: string | null;
  patientCode?: string | null;
  pictureId?: string | null;
  gender?: string | null;
  dateOfBirth?: string;
  fileId?: string;
  isApproved?: boolean | null;
  id?: number;
};
export type PatientScanDocumentUploadRequest = {
  fileId?: string | null;
  file: Blob;
  isUpdate?: boolean;
  id?: number | null;
};
export type ScannedDocumentReviewerQueryResponse = {
  id?: number;
  fullName?: string | null;
};
export const {
  useApiServicesAppPatientdocumentuploadUploadreferralletterfilePostMutation,
  useApiServicesAppPatientdocumentuploadUploadpicturePostMutation,
  useApiServicesAppPatientdocumentuploadAssignuploadedfilestoreviewerPostMutation,
  useApiServicesAppPatientdocumentuploadReviewscanneddocumentPostMutation,
  useApiServicesAppPatientdocumentuploadGetrejectedscanneddocumentsforreviewGetQuery,
  useApiServicesAppPatientdocumentuploadGetdocumentbyidGetQuery,
  useApiServicesAppPatientdocumentuploadGetpublicdocumenturlGetQuery,
  useApiServicesAppPatientdocumentuploadGetdocumentinbasestringbyidGetQuery,
  useApiServicesAppPatientdocumentuploadUploadscandocumentPostMutation,
  useApiServicesAppPatientdocumentuploadGetscanneddocumentsforreviewGetQuery,
  useApiServicesAppPatientdocumentuploadGetscanneddocumentsbypatientcodeGetQuery,
  useApiServicesAppPatientdocumentuploadGetlistofreviewerforscanneddocumentGetQuery,
} = injectedRtkApi;
