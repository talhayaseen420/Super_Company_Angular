import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SunriseState } from '../../../reducers/home.reducer';

export const selectSunriseState = createFeatureSelector<SunriseState>(
  'sunrise'
);

export const selectSunriseData = createSelector(
  selectSunriseState,
  (state) => state.data
);

export const selectSunriseError = createSelector(
  selectSunriseState,
  (state) => state.error
);
