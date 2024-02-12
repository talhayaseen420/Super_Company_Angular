import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardMainComponent } from './dashboard-main/dashboard-main.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { sunriseReducer } from '../reducers/home.reducer';
import { EffectsModule } from '@ngrx/effects';
import { SunriseEffects } from './home/effects/home.effects';
import { HttpClient, HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { AlertComponent } from "./alert/alert.component";

@NgModule({
    declarations: [
        DashboardMainComponent,
        HomeComponent,
        ContactComponent,
        HeaderComponent,
        FooterComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        DashboardRoutingModule,
        AlertComponent
    ]
})
export class DashboardModule { }
