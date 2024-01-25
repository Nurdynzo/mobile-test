import {baseApi as api} from './baseApi';
const injectedRtkApi = api.injectEndpoints({
  endpoints: build => ({
    apiServicesAppWounddressingCreatewounddressingPost: build.mutation<
      ApiServicesAppWounddressingCreatewounddressingPostApiResponse,
      ApiServicesAppWounddressingCreatewounddressingPostApiArg
    >({
      query: queryArg => ({
        url: `/api/services/app/WoundDressing/CreateWoundDressing`,
        method: 'POST',
        body: queryArg.createWoundDressingDto,
      }),
    }),
    apiServicesAppWounddressingGetpatientwounddressingGet: build.query<
      ApiServicesAppWounddressingGetpatientwounddressingGetApiResponse,
      ApiServicesAppWounddressingGetpatientwounddressingGetApiArg
    >({
      query: queryArg => ({
        url: `/api/services/app/WoundDressing/GetPatientWoundDressing`,
        params: {PatientId: queryArg.patientId},
      }),
    }),
    apiServicesAppWounddressingDeletecreatewounddressingDelete: build.mutation<
      ApiServicesAppWounddressingDeletecreatewounddressingDeleteApiResponse,
      ApiServicesAppWounddressingDeletecreatewounddressingDeleteApiArg
    >({
      query: queryArg => ({
        url: `/api/services/app/WoundDressing/DeleteCreateWoundDressing`,
        method: 'DELETE',
        params: {woundDressingId: queryArg.woundDressingId},
      }),
    }),
  }),
  overrideExisting: false,
});
export {injectedRtkApi as woundDressingApi};
export type ApiServicesAppWounddressingCreatewounddressingPostApiResponse =
  unknown;
export type ApiServicesAppWounddressingCreatewounddressingPostApiArg = {
  createWoundDressingDto: CreateWoundDressingDto;
};
export type ApiServicesAppWounddressingGetpatientwounddressingGetApiResponse =
  /** status 200 Success */ WoundDressingSummaryForReturnDto[];
export type ApiServicesAppWounddressingGetpatientwounddressingGetApiArg = {
  patientId?: number;
};
export type ApiServicesAppWounddressingDeletecreatewounddressingDeleteApiResponse =
  unknown;
export type ApiServicesAppWounddressingDeletecreatewounddressingDeleteApiArg = {
  woundDressingId?: number;
};
export type CreateWoundDressingDto = {
  patientId?: number;
  appointmentId?: number;
  stamp?: number | null;
  woundDressingSnowmedIds?: string[] | null;
  description?: string | null;
};
export type WoundDressingSummaryForReturnDto = {
  id?: number;
  description?: string | null;
  creationTime?: string;
  deletionTime?: string | null;
};
export const {
  useApiServicesAppWounddressingCreatewounddressingPostMutation,
  useApiServicesAppWounddressingGetpatientwounddressingGetQuery,
  useApiServicesAppWounddressingDeletecreatewounddressingDeleteMutation,
} = injectedRtkApi;
