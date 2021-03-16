import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { IncidentsComponent } from './incidents/incidents.component';
import { MapComponent } from './map/map.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ProfileComponent } from './profile/profile.component';
import { SafetyDocsComponent } from './safety-docs/safety-docs.component';
import { WorkPlansComponent } from './work-plans/work-plans.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'notifications', component: NotificationsComponent},
  {path: 'map', component: MapComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'dashboard/incidents', component: IncidentsComponent},
  {path: 'dashboard/work-plans', component: WorkPlansComponent},
  {path: 'dashboard/safety-docs', component: SafetyDocsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
