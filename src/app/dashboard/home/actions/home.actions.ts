import { createAction, props } from '@ngrx/store';

export const loadSunriseData = createAction(
  '[Sunrise] Load Sunrise Data',
  props<{ latitude: string; longitude: string; date: string }>()
);

export const loadSunriseDataSuccess = createAction(
  '[Sunrise] Load Sunrise Data Success',
  props<{ data: any }>()
);

export const loadSunriseDataFailure = createAction(
  '[Sunrise] Load Sunrise Data Failure',
  props<{ error: any }>()
);

export const resetSunriseData = createAction('[Home] Reset Sunrise Data');

