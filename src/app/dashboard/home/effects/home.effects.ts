import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as SunriseActions from '../actions/home.actions';
import { SuperService } from '../../../super.service';

@Injectable()
export class SunriseEffects {
  loadSunriseData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SunriseActions.loadSunriseData),
      switchMap(({ latitude, longitude, date }) =>
        this.service
          .getSunriseSunset(latitude, longitude, date)
          .pipe(
            map((data) =>
              SunriseActions.loadSunriseDataSuccess({ data })
            ),
            catchError((error) =>
              of(SunriseActions.loadSunriseDataFailure({ error }))
            )
          )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private service: SuperService
  ) {}
}
