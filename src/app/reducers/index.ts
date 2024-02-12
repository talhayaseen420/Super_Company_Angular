import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { sunriseReducer } from './home.reducer';

export interface State {

}

export const reducers: ActionReducerMap<State> = {
  sunrise : sunriseReducer
};


export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
