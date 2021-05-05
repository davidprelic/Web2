import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { IncidentListComponent } from './incidents/incident-list/incident-list.component';
import { NewIncidentComponent } from './incidents/new-incident/new-incident.component';
import { MapComponent } from './map/map.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ProfileComponent } from './profile/profile.component';
import { WorkPlansListComponent} from './work-plans/work-plans-list/work-plans-list.component';
import { NewWorkPlansComponent} from './work-plans/new-work-plans/new-work-plans.component';
import { SafetyDocsListComponent } from './safety-docs/safety-docs-list/safety-docs-list.component';
import { SafetyDocComponent } from './safety-docs/safety-doc/safety-doc.component';
import { DevicesListComponent } from './devices/devices-list/devices-list.component';
import { NewDeviceComponent } from './devices/new-device/new-device.component';
import { SearchElementsComponent } from './search-elements/search-elements.component';
import { WorkRequestListComponent } from './work-requests/work-request-list/work-request-list.component';
import { WorkRequestComponent } from './work-requests/work-request/work-request.component';
import { CrewsListComponent } from './crews/crews-list/crews-list.component';
import { NewCrewComponent } from './crews/new-crew/new-crew.component';
import { MapViewComponent } from './map-view/map-view.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'notifications', component: NotificationsComponent},
  {path: 'map', component: MapViewComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'search-elements', component: SearchElementsComponent},
  {path: 'devices', component: DevicesListComponent},
  {path: 'devices/0', component: NewDeviceComponent},
  {path: 'crews', component: CrewsListComponent},
  {path: 'crews/0', component: NewCrewComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'dashboard/incidents', component: IncidentListComponent},
  {path: 'dashboard/incidents/new-incident', component: NewIncidentComponent},
  {path: 'dashboard/safety-docs', component: SafetyDocsListComponent},
  {path: 'dashboard/safety-docs/0', component: SafetyDocComponent},
  {path: 'dashboard/work-plans', component: WorkPlansListComponent},
  {path: 'dashboard/work-plans/new-work-plans', component: NewWorkPlansComponent},
  {path: 'dashboard/work-requests', component: WorkRequestListComponent},
  {path: 'dashboard/work-requests/0', component: WorkRequestComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
