import {addNoteApiHandler} from './addNoteApiHandler';
import {authApiHandler} from './authApiHandler';
import {bedMakingApiHandler} from './bedMakingApiHandler';
import {countryApiHandler} from './countryApiHandler';
import {districtApiHandler} from './districtApiHandler';
import {intakeOutputChartApiHandler} from './intakeOutputChartApiHandler';
import {miscellaneousInterventionsApiHandler} from './miscellaneousInterventionsApiHandler';
import {occupationApiHandler} from './occupationApihndler';
import {otherPlanItemsApiHandler} from './otherPlanItemsApiHandler';
import {patientApiHandler} from './patientApiHandler';
import {patientOccupationApiHandler} from './patientOccupationApiHandler';
import {regionsApiHandler} from './regionsApiHandler';
import {snowmedApiHandler} from './snowmedApiHandler';
import {vaccinationApiHandler} from './vaccinationHandler';
import {woundDressingApiHandler} from './woundDressingApiHandler';
export const handlers = [
  ...authApiHandler,
  ...addNoteApiHandler,
  ...intakeOutputChartApiHandler,
  ...woundDressingApiHandler,
  ...bedMakingApiHandler,
  ...snowmedApiHandler,
  ...miscellaneousInterventionsApiHandler,
  ...patientApiHandler,
  ...regionsApiHandler,
  ...countryApiHandler,
  ...districtApiHandler,
  ...occupationApiHandler,
  ...vaccinationApiHandler,
  ...otherPlanItemsApiHandler,
  ...patientOccupationApiHandler,
];
