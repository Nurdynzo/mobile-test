import {baseApi as api} from './baseApi';
export const addTagTypes = ['Discharge', 'PlanItems'] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: build => ({
      apiServicesAppDischargeGetdischargeplanitemsGet: build.query<
        ApiServicesAppDischargeGetdischargeplanitemsGetApiResponse,
        ApiServicesAppDischargeGetdischargeplanitemsGetApiArg
      >({
        query: queryArg => ({
          url: `/api/services/app/Discharge/GetDischargePlanItems`,
          params: {dischargeId: queryArg.dischargeId},
        }),
        providesTags: ['Discharge'],
      }),
      apiServicesAppDischargeGetpatientdischargeplanitemsGet: build.query<
        ApiServicesAppDischargeGetpatientdischargeplanitemsGetApiResponse,
        ApiServicesAppDischargeGetpatientdischargeplanitemsGetApiArg
      >({
        query: queryArg => ({
          url: `/api/services/app/Discharge/GetPatientDischargePlanItems`,
          params: {patientId: queryArg.patientId},
        }),
        providesTags: ['Discharge'],
      }),
      apiServicesAppPlanitemsCreateplanitemsPost: build.mutation<
        ApiServicesAppPlanitemsCreateplanitemsPostApiResponse,
        ApiServicesAppPlanitemsCreateplanitemsPostApiArg
      >({
        query: queryArg => ({
          url: `/api/services/app/PlanItems/CreatePlanItems`,
          method: 'POST',
          body: queryArg.createPlanItemsDto,
        }),
        invalidatesTags: ['PlanItems'],
      }),
      apiServicesAppPlanitemsGetpatientplanitemsGet: build.query<
        ApiServicesAppPlanitemsGetpatientplanitemsGetApiResponse,
        ApiServicesAppPlanitemsGetpatientplanitemsGetApiArg
      >({
        query: queryArg => ({
          url: `/api/services/app/PlanItems/GetPatientPlanItems`,
          params: {
            PatientId: queryArg.patientId,
            ProcedureId: queryArg.procedureId,
          },
        }),
        providesTags: ['PlanItems'],
      }),
      apiServicesAppPlanitemsDeletecreateplanitemsDelete: build.mutation<
        ApiServicesAppPlanitemsDeletecreateplanitemsDeleteApiResponse,
        ApiServicesAppPlanitemsDeletecreateplanitemsDeleteApiArg
      >({
        query: queryArg => ({
          url: `/api/services/app/PlanItems/DeleteCreatePlanItems`,
          method: 'DELETE',
          params: {planItemsId: queryArg.planItemsId},
        }),
        invalidatesTags: ['PlanItems'],
      }),
    }),
    overrideExisting: false,
  });
export {injectedRtkApi as planItemsApi};
export type ApiServicesAppDischargeGetdischargeplanitemsGetApiResponse =
  /** status 200 Success */ DischargePlanItemDto[];
export type ApiServicesAppDischargeGetdischargeplanitemsGetApiArg = {
  dischargeId?: number;
};
export type ApiServicesAppDischargeGetpatientdischargeplanitemsGetApiResponse =
  /** status 200 Success */ DischargeDto[];
export type ApiServicesAppDischargeGetpatientdischargeplanitemsGetApiArg = {
  patientId?: number;
};
export type ApiServicesAppPlanitemsCreateplanitemsPostApiResponse = unknown;
export type ApiServicesAppPlanitemsCreateplanitemsPostApiArg = {
  createPlanItemsDto: CreatePlanItemsDto;
};
export type ApiServicesAppPlanitemsGetpatientplanitemsGetApiResponse =
  /** status 200 Success */ PlanItemsSummaryForReturnDto[];
export type ApiServicesAppPlanitemsGetpatientplanitemsGetApiArg = {
  patientId?: number;
  procedureId?: number;
};
export type ApiServicesAppPlanitemsDeletecreateplanitemsDeleteApiResponse =
  unknown;
export type ApiServicesAppPlanitemsDeletecreateplanitemsDeleteApiArg = {
  planItemsId?: number;
};
export type DischargePlanItemDto = {
  planItemId?: number;
  patientId?: number;
  dischargeId?: number;
  description?: string | null;
  creationTime?: string;
  deletionTime?: string | null;
};
export type DischargeEntryType = 1 | 2 | 3 | 4;
export type DischargeStatus = 1 | 2 | 3;
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
export type DischargeDto = {
  id?: number;
  patientId?: number;
  isFinalized?: boolean;
  dischargeType?: DischargeEntryType;
  status?: DischargeStatus;
  isBroughtInDead?: boolean;
  dateOfDeath?: string | null;
  timeOfDeath?: string | null;
  timeCPRCommenced?: string | null;
  timeCPREnded?: string | null;
  causesOfDeath?: string | null;
  note?: string | null;
  appointmentId?: number | null;
  prescriptions?: PatientMedicationForReturnDto[] | null;
  planItems?: DischargePlanItemDto[] | null;
};
export type CreatePlanItemsDto = {
  patientId?: number;
  procedureId?: number | null;
  appointmentId?: number;
  stamp?: number | null;
  planItemsSnowmedIds?: string[] | null;
  description?: string | null;
};
export type PlanItemsSummaryForReturnDto = {
  id?: number;
  description?: string | null;
  creationTime?: string;
  deletionTime?: string | null;
};
export const {
  useApiServicesAppDischargeGetdischargeplanitemsGetQuery,
  useApiServicesAppDischargeGetpatientdischargeplanitemsGetQuery,
  useApiServicesAppPlanitemsCreateplanitemsPostMutation,
  useApiServicesAppPlanitemsGetpatientplanitemsGetQuery,
  useApiServicesAppPlanitemsDeletecreateplanitemsDeleteMutation,
} = injectedRtkApi;
