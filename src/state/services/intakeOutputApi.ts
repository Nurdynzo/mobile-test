import {baseApi as api} from './baseApi';
export const addTagTypes = ['IntakeOutput'] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: build => ({
      apiServicesAppIntakeoutputCreateoreditintakePost: build.mutation<
        ApiServicesAppIntakeoutputCreateoreditintakePostApiResponse,
        ApiServicesAppIntakeoutputCreateoreditintakePostApiArg
      >({
        query: queryArg => ({
          url: `/api/services/app/IntakeOutput/CreateOrEditIntake`,
          method: 'POST',
          body: queryArg.createIntakeOutputDto,
        }),
        invalidatesTags: ['IntakeOutput'],
      }),
      apiServicesAppIntakeoutputCreateoreditoutputPost: build.mutation<
        ApiServicesAppIntakeoutputCreateoreditoutputPostApiResponse,
        ApiServicesAppIntakeoutputCreateoreditoutputPostApiArg
      >({
        query: queryArg => ({
          url: `/api/services/app/IntakeOutput/CreateOrEditOutput`,
          method: 'POST',
          body: queryArg.createIntakeOutputDto,
        }),
        invalidatesTags: ['IntakeOutput'],
      }),
      apiServicesAppIntakeoutputDeleteintakeoroutputDelete: build.mutation<
        ApiServicesAppIntakeoutputDeleteintakeoroutputDeleteApiResponse,
        ApiServicesAppIntakeoutputDeleteintakeoroutputDeleteApiArg
      >({
        query: queryArg => ({
          url: `/api/services/app/IntakeOutput/DeleteIntakeOrOutput`,
          method: 'DELETE',
          params: {intakeOrOutputId: queryArg.intakeOrOutputId},
        }),
        invalidatesTags: ['IntakeOutput'],
      }),
      apiServicesAppIntakeoutputGetintakesuggestionsGet: build.query<
        ApiServicesAppIntakeoutputGetintakesuggestionsGetApiResponse,
        ApiServicesAppIntakeoutputGetintakesuggestionsGetApiArg
      >({
        query: queryArg => ({
          url: `/api/services/app/IntakeOutput/GetIntakeSuggestions`,
          params: {patientId: queryArg.patientId},
        }),
        providesTags: ['IntakeOutput'],
      }),
      apiServicesAppIntakeoutputGetoutputsuggestionsGet: build.query<
        ApiServicesAppIntakeoutputGetoutputsuggestionsGetApiResponse,
        ApiServicesAppIntakeoutputGetoutputsuggestionsGetApiArg
      >({
        query: queryArg => ({
          url: `/api/services/app/IntakeOutput/GetOutputSuggestions`,
          params: {patientId: queryArg.patientId},
        }),
        providesTags: ['IntakeOutput'],
      }),
      apiServicesAppIntakeoutputGetintakeoutputsavedhistoryGet: build.query<
        ApiServicesAppIntakeoutputGetintakeoutputsavedhistoryGetApiResponse,
        ApiServicesAppIntakeoutputGetintakeoutputsavedhistoryGetApiArg
      >({
        query: queryArg => ({
          url: `/api/services/app/IntakeOutput/GetIntakeOutputSavedHistory`,
          params: {patientId: queryArg.patientId},
        }),
        providesTags: ['IntakeOutput'],
      }),
    }),
    overrideExisting: false,
  });
export {injectedRtkApi as intakeOutputApi};
export type ApiServicesAppIntakeoutputCreateoreditintakePostApiResponse =
  /** status 200 Success */ IntakeOutputReturnDto;
export type ApiServicesAppIntakeoutputCreateoreditintakePostApiArg = {
  createIntakeOutputDto: CreateIntakeOutputDto;
};
export type ApiServicesAppIntakeoutputCreateoreditoutputPostApiResponse =
  /** status 200 Success */ IntakeOutputReturnDto;
export type ApiServicesAppIntakeoutputCreateoreditoutputPostApiArg = {
  createIntakeOutputDto: CreateIntakeOutputDto;
};
export type ApiServicesAppIntakeoutputDeleteintakeoroutputDeleteApiResponse =
  /** status 200 Success */ boolean;
export type ApiServicesAppIntakeoutputDeleteintakeoroutputDeleteApiArg = {
  intakeOrOutputId?: number;
};
export type ApiServicesAppIntakeoutputGetintakesuggestionsGetApiResponse =
  /** status 200 Success */ PatientIntakeOutputDto;
export type ApiServicesAppIntakeoutputGetintakesuggestionsGetApiArg = {
  patientId?: number;
};
export type ApiServicesAppIntakeoutputGetoutputsuggestionsGetApiResponse =
  /** status 200 Success */ PatientIntakeOutputDto;
export type ApiServicesAppIntakeoutputGetoutputsuggestionsGetApiArg = {
  patientId?: number;
};
export type ApiServicesAppIntakeoutputGetintakeoutputsavedhistoryGetApiResponse =
  /** status 200 Success */ PatientIntakeOutputDto[];
export type ApiServicesAppIntakeoutputGetintakeoutputsavedhistoryGetApiArg = {
  patientId?: number;
};
export type ChartingType = 1 | 2 | 3;
export type IntakeOutputReturnDto = {
  id?: number;
  patientId: number;
  type: ChartingType;
  pannel?: string | null;
  suggestedText: string;
  volumnInMls: number;
};
export type CreateIntakeOutputDto = {
  id?: number | null;
  patientId: number;
  type?: ChartingType;
  suggestedText: string;
  volumnInMls: number;
};
export type SuggestedTextDto = {
  id?: number | null;
  suggestedText: string;
  volumnInMls: number;
  frequency?: string | null;
  createdAt?: string | null;
};
export type PatientIntakeOutputDto = {
  patientId: number;
  type: ChartingType;
  chartingTypeText?: string | null;
  suggestedText?: SuggestedTextDto[] | null;
};
export const {
  useApiServicesAppIntakeoutputCreateoreditintakePostMutation,
  useApiServicesAppIntakeoutputCreateoreditoutputPostMutation,
  useApiServicesAppIntakeoutputDeleteintakeoroutputDeleteMutation,
  useApiServicesAppIntakeoutputGetintakesuggestionsGetQuery,
  useApiServicesAppIntakeoutputGetoutputsuggestionsGetQuery,
  useApiServicesAppIntakeoutputGetintakeoutputsavedhistoryGetQuery,
} = injectedRtkApi;
