import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { SunriseEffects } from './dashboard/home/effects/home.effects';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { reducers, metaReducers } from './reducers';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from '.././environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { errorInterceptor } from './intercepter/error.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(AngularFireModule.initializeApp(environment.firebase)),
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideFirestore(() => getFirestore())),
    provideAnimations(),
    provideToastr(),
    provideRouter(routes),
    provideHttpClient(
      withInterceptorsFromDi()
    ),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: errorInterceptor,
      multi: true
    },
    provideStore(reducers, { metaReducers }),
    provideEffects([SunriseEffects]), 
]
};
