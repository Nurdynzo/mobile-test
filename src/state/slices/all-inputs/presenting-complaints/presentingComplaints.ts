import {RootState} from '@/state/store';
import {createSlice} from '@reduxjs/toolkit';
import _ from 'lodash';

export type SocratesState = {
  mainSearchResult: string;
  mainSearchResultSnowmedId: number;
  note: string;
  site: Site;
  radiation: Radiation;
  associations: Associations;
  exacerbating: Exacerbating;
  onSet: OnSet;
  character: Character;
  severity: number;
  timeCourse: TimeCourse;
};

export type Site = {
  activePills: Array<Pill>;
  bodyPartSearch: string;
};

export type Radiation = {
  activePills: Array<Pill>;
  bodyPartSearch: string;
};

export type Associations = {
  activePills: Array<Pill>;
  bodyPartSearch: string;
};

export type Exacerbating = {
  activePills: Array<Pill>;
  symptomSearch: string;
};

export type OnSet = {
  interval: number;
  intervalUnit: string;
  cyclicality: string;
};

export type Character = {
  activePills: Pill[];
  characteristicSearch: string;
};

export type TimeCourse = {
  interval: number;
  intervalUnit: string;
  symptomsFelt: string;
};

export type Pill = {
  value: string;
  type?: string;
  snowmedId?: string;
};
export const initialState = {
  tempState: {
    note: '',
    mainSearchResult: '',
    mainSearchResultSnowmedId: 0,
    site: {
      bodyPartSearch: '',
      activePills: [],
    },
    radiation: {
      bodyPartSearch: '',
      activePills: [],
    },
    associations: {
      bodyPartSearch: '',
      activePills: [],
    },
    exacerbating: {
      symptomSearch: '',
      activePills: [],
    },
    onSet: {
      interval: 0,
      intervalUnit: '',
      cyclicality: '',
    },
    character: {
      characteristicSearch: '',
      activePills: [],
    },
    severity: 0,
    timeCourse: {
      interval: 0,
      intervalUnit: '',
      symptomsFelt: '',
    },
  },
  states: [],
} as {
  states: SocratesState[];
  tempState: SocratesState;
};

const presentingComplaintsSlice = createSlice({
  name: 'presentingComplaints',
  initialState,
  reducers: {
    setTempState: (state, action) => {
      state.tempState = _.mergeWith(
        state.tempState,
        action.payload,
        (objValue, srcValue) => {
          if (_.isArray(objValue)) {
            return srcValue;
          }
        },
      );
    },
    setStates: (state, action) => {
      state.states = action.payload;
    },
  },
});

export const {setStates, setTempState} = presentingComplaintsSlice.actions;

export const selectStates = (state: RootState): SocratesState[] => {
  return state.presentingComplaints.states;
};

export const selectTempState = (state: RootState): SocratesState => {
  return state.presentingComplaints.tempState;
};

export default presentingComplaintsSlice.reducer;
