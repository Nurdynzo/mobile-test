import {baseApi as api} from './baseApi';
export const addTagTypes = ['Discharge', 'Medication', 'Snowstorm'] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: build => ({
      apiServicesAppDischargeGetdischargemedicationsGet: build.query<
        ApiServicesAppDischargeGetdischargemedicationsGetApiResponse,
        ApiServicesAppDischargeGetdischargemedicationsGetApiArg
      >({
        query: queryArg => ({
          url: `/api/services/app/Discharge/GetDischargeMedications`,
          params: {dischargeId: queryArg.dischargeId},
        }),
        providesTags: ['Discharge'],
      }),
      apiServicesAppMedicationCreatemedicationPost: build.mutation<
        ApiServicesAppMedicationCreatemedicationPostApiResponse,
        ApiServicesAppMedicationCreatemedicationPostApiArg
      >({
        query: queryArg => ({
          url: `/api/services/app/Medication/CreateMedication`,
          method: 'POST',
          body: queryArg.createMultipleMedicationsDto,
        }),
        invalidatesTags: ['Medication'],
      }),
      apiServicesAppMedicationGetsearchedmedicationsGet: build.query<
        ApiServicesAppMedicationGetsearchedmedicationsGetApiResponse,
        ApiServicesAppMedicationGetsearchedmedicationsGetApiArg
      >({
        query: queryArg => ({
          url: `/api/services/app/Medication/GetSearchedMedications`,
          params: {searchTerm: queryArg.searchTerm},
        }),
        providesTags: ['Medication'],
      }),
      apiServicesAppMedicationGetmedicationsuggestionsGet: build.query<
        ApiServicesAppMedicationGetmedicationsuggestionsGetApiResponse,
        ApiServicesAppMedicationGetmedicationsuggestionsGetApiArg
      >({
        query: () => ({
          url: `/api/services/app/Medication/GetMedicationSuggestions`,
        }),
        providesTags: ['Medication'],
      }),
      apiServicesAppMedicationGetpatientprescriptionsGet: build.query<
        ApiServicesAppMedicationGetpatientprescriptionsGetApiResponse,
        ApiServicesAppMedicationGetpatientprescriptionsGetApiArg
      >({
        query: queryArg => ({
          url: `/api/services/app/Medication/GetPatientPrescriptions`,
          params: {patientId: queryArg.patientId},
        }),
        providesTags: ['Medication'],
      }),
      apiServicesAppMedicationGetmedicationsugguestionsGet: build.query<
        ApiServicesAppMedicationGetmedicationsugguestionsGetApiResponse,
        ApiServicesAppMedicationGetmedicationsugguestionsGetApiArg
      >({
        query: () => ({
          url: `/api/services/app/Medication/GetMedicationSugguestions`,
        }),
        providesTags: ['Medication'],
      }),
      apiServicesAppSnowstormGetmedicationbytermGet: build.query<
        ApiServicesAppSnowstormGetmedicationbytermGetApiResponse,
        ApiServicesAppSnowstormGetmedicationbytermGetApiArg
      >({
        query: queryArg => ({
          url: `/api/services/app/Snowstorm/GetMedicationByTerm`,
          params: {searchTerm: queryArg.searchTerm},
        }),
        providesTags: ['Snowstorm'],
      }),
    }),
    overrideExisting: false,
  });
export {injectedRtkApi as medicationApi};
export type ApiServicesAppDischargeGetdischargemedicationsGetApiResponse =
  /** status 200 Success */ PatientMedicationForReturnDto[];
export type ApiServicesAppDischargeGetdischargemedicationsGetApiArg = {
  dischargeId?: number;
};
export type ApiServicesAppMedicationCreatemedicationPostApiResponse = unknown;
export type ApiServicesAppMedicationCreatemedicationPostApiArg = {
  createMultipleMedicationsDto: CreateMultipleMedicationsDto;
};
export type ApiServicesAppMedicationGetsearchedmedicationsGetApiResponse =
  /** status 200 Success */ SearchMedicationForReturnDto[];
export type ApiServicesAppMedicationGetsearchedmedicationsGetApiArg = {
  searchTerm?: string;
};
export type ApiServicesAppMedicationGetmedicationsuggestionsGetApiResponse =
  /** status 200 Success */ MedicationSuggestionForReturnDto;
export type ApiServicesAppMedicationGetmedicationsuggestionsGetApiArg = void;
export type ApiServicesAppMedicationGetpatientprescriptionsGetApiResponse =
  /** status 200 Success */ PatientMedicationForReturnDto[];
export type ApiServicesAppMedicationGetpatientprescriptionsGetApiArg = {
  patientId?: number;
};
export type ApiServicesAppMedicationGetmedicationsugguestionsGetApiResponse =
  /** status 200 Success */ SearchMedicationForReturnDto[];
export type ApiServicesAppMedicationGetmedicationsugguestionsGetApiArg = void;
export type ApiServicesAppSnowstormGetmedicationbytermGetApiResponse =
  /** status 200 Success */ SnowstormSimpleResponseDto[];
export type ApiServicesAppSnowstormGetmedicationbytermGetApiArg = {
  searchTerm?: string;
};
export type PatientMedicationForReturnDto = {
  id?: number;
  patientId?: number;
  productId?: number;
  productName?: string | null;
  productSource?: string | null;
  doseUnit?: string | null;
  frequency?: string | null;
  duration?: string | null;
  direction?: string | null;
  note?: string | null;
  creationTime?: string;
};
export type CreateMedicationDto = {
  patientId?: number;
  productId?: number;
  productName?: string | null;
  productSource?: string | null;
  doseUnit?: string | null;
  frequency?: string | null;
  duration?: string | null;
  direction?: string | null;
  note?: string | null;
};
export type CreateMultipleMedicationsDto = {
  prescriptions?: CreateMedicationDto[] | null;
};
export type SearchMedicationForReturnDto = {
  id?: number;
  productName?: string | null;
  genericName?: string | null;
  activeIngredient?: string | null;
  brandName?: string | null;
  categoryName?: string | null;
  doseForm?: string | null;
  doseStrength?: string | null;
  source?: string | null;
};
export type MedicationSuggestionForReturnDto = {
  dose?: string[] | null;
  unit?: string[] | null;
  frequency?: string[] | null;
  direction?: string[] | null;
  duration?: string[] | null;
};
export type SnowstormSimpleResponseDto = {
  id?: string | null;
  name?: string | null;
};
export const {
  useApiServicesAppDischargeGetdischargemedicationsGetQuery,
  useApiServicesAppMedicationCreatemedicationPostMutation,
  useApiServicesAppMedicationGetsearchedmedicationsGetQuery,
  useApiServicesAppMedicationGetmedicationsuggestionsGetQuery,
  useApiServicesAppMedicationGetpatientprescriptionsGetQuery,
  useApiServicesAppMedicationGetmedicationsugguestionsGetQuery,
  useApiServicesAppSnowstormGetmedicationbytermGetQuery,
} = injectedRtkApi;
