import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { IncidentListComponent } from './incidents/incident-list/incident-list.component';
import { IncidentComponent } from './incidents/incident/incident.component';
import { MapComponent } from './map/map.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ProfileComponent } from './profile/profile.component';
import { WorkPlansListComponent} from './work-plans/work-plans-list/work-plans-list.component';
import { NewWorkPlansComponent} from './work-plans/new-work-plans/new-work-plans.component';
import { SafetyDocsListComponent } from './safety-docs/safety-docs-list/safety-docs-list.component';
import { SafetyDocComponent } from './safety-docs/safety-doc/safety-doc.component';
import { DevicesListComponent } from './devices/devices-list/devices-list.component';
import { NewDeviceComponent } from './devices/new-device/new-device.component';
import { WorkRequestListComponent } from './work-requests/work-request-list/work-request-list.component';
import { WorkRequestComponent } from './work-requests/work-request/work-request.component';
import { CrewsListComponent } from './crews/crews-list/crews-list.component';
import { NewCrewComponent } from './crews/new-crew/new-crew.component';
import { CrewDetailsComponent } from './crews/crew-details/crew-details.component';
import { SelectMembersDialogComponent } from './crews/select-members-dialog/select-members-dialog.component';

import { MapViewComponent } from './map-view/map-view.component';

import { ConsumersListComponent } from './consumers/consumers-list/consumers-list.component';
import { NewConsumerComponent } from './consumers/new-consumer/new-consumer.component';
import { ConsumerDetailsComponent } from './consumers/consumer-details/consumer-details.component';
import { AuthGuard } from './_guards/auth.guard';
import { ReportOutageComponent } from './report-outage/report-outage.component';
import { DeviceDetailsComponent } from './devices/device-details/device-details.component';
import { IncidentBasicInfoComponent } from './incidents/incident-basic-info/incident-basic-info.component';
import { IncidentDevicesComponent } from './incidents/incident-devices/incident-devices.component';
import { IncidentResolutionComponent } from './incidents/incident-resolution/incident-resolution.component';
import { IncidentCallsComponent } from './incidents/incident-calls/incident-calls.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'report-outage', component: ReportOutageComponent},
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {path: 'notifications', component: NotificationsComponent},
      {path: 'map', component: MapViewComponent},
      {path: 'profile', component: ProfileComponent},
      {path: 'devices', component: DevicesListComponent},
      {path: 'devices/0', component: NewDeviceComponent},
      {path: 'devices/:id', component: DeviceDetailsComponent},
      {path: 'crews', component: CrewsListComponent},
      {path: 'crews/0', component: NewCrewComponent},
      {path: 'crews/:id', component: CrewDetailsComponent},
      {path: 'consumers', component: ConsumersListComponent},
      {path: 'consumers/0', component: NewConsumerComponent},
      {path: 'consumers/:id', component: ConsumerDetailsComponent},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'dashboard/incidents', component: IncidentListComponent},
      // {path: 'dashboard/incidents/0', component: IncidentComponent},
      {path: 'dashboard/incidents/:id', component: IncidentComponent},
      {path: 'dashboard/safety-docs', component: SafetyDocsListComponent},
      {path: 'dashboard/safety-docs/0', component: SafetyDocComponent},
      {path: 'dashboard/work-plans', component: WorkPlansListComponent},
      {path: 'dashboard/work-plans/new-work-plans', component: NewWorkPlansComponent},
      {path: 'dashboard/work-requests', component: WorkRequestListComponent},
      {path: 'dashboard/work-requests/0', component: WorkRequestComponent},
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
