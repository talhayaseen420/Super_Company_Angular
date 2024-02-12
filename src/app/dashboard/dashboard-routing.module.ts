import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { DashboardMainComponent } from './dashboard-main/dashboard-main.component';

const routes: Routes = [
  {
    path:'',
    component: DashboardMainComponent,
    children:[
      { path: 'home', component: HomeComponent },
      { path: 'contact', component: ContactComponent },
      { path: '', redirectTo: '/dashboard/home', pathMatch: 'full' },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
