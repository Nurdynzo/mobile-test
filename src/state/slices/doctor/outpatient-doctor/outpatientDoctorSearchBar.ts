import {GetPatientLandingListOuptDto} from '@/state/services/patientApi';
import {RootState} from '@/state/store';
import {
  OverlaySearchBarType,
  createOverlaySearchBarSlice,
} from '../../base-implementaions/baseImplementation';
import {EMPTY_STRING} from '@/utils/constants';

const initialState: OverlaySearchBarType<GetPatientLandingListOuptDto> = {
  searchTerm: EMPTY_STRING,
};

const outpatientDoctorSearchBarSlice = createOverlaySearchBarSlice({
  name: 'outpatientDoctorSearchBar',
  initialState,
});

export const setOutpatientDoctorSearchTerm =
  outpatientDoctorSearchBarSlice.actions.setSearchTerm;

export const setOutpatientDoctorSelectedResult =
  outpatientDoctorSearchBarSlice.actions.setSelectedResult;

export const selectOutpatientDoctorSearchTerm = (state: RootState): string =>
  state.outpatientDoctorSearchBar.searchTerm;

export const selectOutpatientDoctorSelectedResult = (
  state: RootState,
): GetPatientLandingListOuptDto | undefined =>
  state.outpatientDoctorSearchBar.selectedResult;

export default outpatientDoctorSearchBarSlice.reducer;
