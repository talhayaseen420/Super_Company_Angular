import { createReducer, on } from '@ngrx/store';
import * as SunriseActions from '../dashboard/home/actions/home.actions';

export interface SunriseState {
  data: any;
  error: any;
}

export const initialState: SunriseState = {
  data: null,
  error: null,
};

export const sunriseReducer = createReducer(
  initialState,
  on(SunriseActions.loadSunriseDataSuccess, (state, { data }) => ({
    ...state,
    data,
    error: null,
  })),
  on(SunriseActions.loadSunriseDataFailure, (state, { error }) => ({
    ...state,
    data: null,
    error,
  })),
  on(SunriseActions.resetSunriseData, (state) => ({
    ...state,
    data: null,
  }))
);
