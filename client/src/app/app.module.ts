import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RegisterComponent } from './register/register.component';
import { NavComponent } from './nav/nav.component';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { MapComponent } from './map/map.component';
import { IncidentListComponent } from './incidents/incident-list/incident-list.component';
import { IncidentBasicInfoComponent } from './incidents/incident-basic-info/incident-basic-info.component';
import { IncidentComponent } from './incidents/incident/incident.component';
import { DeviceListDialogComponent } from './incidents/device-list-dialog/device-list-dialog.component';
import { CrewListDialogComponent } from './incidents/crew-list-dialog/crew-list-dialog.component';
import { AddCallDialogComponent } from './incidents/add-call-dialog/add-call-dialog.component';
import { SelectCustomerDialogComponent } from './incidents/select-customer-dialog/select-customer-dialog.component';
import { WorkPlansListComponent } from './work-plans/work-plans-list/work-plans-list.component';
import { NewWorkPlansComponent } from './work-plans/new-work-plans/new-work-plans.component';
import { NewWorkPlansBasicInfoComponent } from './work-plans/new-work-plans-basic-info/new-work-plans-basic-info.component';
import { NewWorkPlansHistoryComponent } from './work-plans/new-work-plans-history/new-work-plans-history.component';
import { NewWorkPlansMultimediaComponent } from './work-plans/new-work-plans-multimedia/new-work-plans-multimedia.component';
import { NewWorkPlansEquipmentComponent } from './work-plans/new-work-plans-equipment/new-work-plans-equipment.component';
import { NewWorkPlansSwitchingInstructionsComponent } from './work-plans/new-work-plans-switching-instructions/new-work-plans-switching-instructions.component';
import { SafetyDocsListComponent } from './safety-docs/safety-docs-list/safety-docs-list.component';
import { SafetyDocComponent } from './safety-docs/safety-doc/safety-doc.component';
import { SafetyDocBasicInfoComponent } from './safety-docs/safety-doc-basic-info/safety-doc-basic-info.component';
import { SafetyDocHistoryComponent } from './safety-docs/safety-doc-history/safety-doc-history.component';
import { SafetyDocMultimediaComponent } from './safety-docs/safety-doc-multimedia/safety-doc-multimedia.component';
import { SafetyDocChecklistComponent } from './safety-docs/safety-doc-checklist/safety-doc-checklist.component';
import { DevicesListComponent } from './devices/devices-list/devices-list.component';
import { NewDeviceComponent } from './devices/new-device/new-device.component';
import { WorkRequestListComponent } from './work-requests/work-request-list/work-request-list.component';
import { WorkRequestComponent } from './work-requests/work-request/work-request.component';
import { WorkRequestBasicInfoComponent } from './work-requests/work-request-basic-info/work-request-basic-info.component';
import { WorkRequestHistoryComponent } from './work-requests/work-request-history/work-request-history.component';
import { WorkRequestMultimediaComponent } from './work-requests/work-request-multimedia/work-request-multimedia.component';
import { CrewsListComponent } from './crews/crews-list/crews-list.component';
import { NewCrewComponent } from './crews/new-crew/new-crew.component';
import { SelectMembersDialogComponent } from './crews/select-members-dialog/select-members-dialog.component';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MapViewComponent } from './map-view/map-view.component';

import { AddSwitchingInstructionComponent } from './work-plans/add-switching-instruction/add-switching-instruction.component';
import { SelectDeviceDialogComponent } from './work-plans/select-device-dialog/select-device-dialog.component';
import { ConsumersListComponent } from './consumers/consumers-list/consumers-list.component';
import { NewConsumerComponent } from './consumers/new-consumer/new-consumer.component';
import { HttpClientModule } from '@angular/common/http';
import { ReportOutageComponent } from './report-outage/report-outage.component';
import { DeviceDetailsComponent } from './devices/device-details/device-details.component';
import { CrewDetailsComponent } from './crews/crew-details/crew-details.component';
import { ConsumerDetailsComponent } from './consumers/consumer-details/consumer-details.component';
import { IncidentDevicesComponent } from './incidents/incident-devices/incident-devices.component';
import { IncidentResolutionComponent } from './incidents/incident-resolution/incident-resolution.component';
import { IncidentCallsComponent } from './incidents/incident-calls/incident-calls.component';
import { IncidentCrewComponent } from './incidents/incident-crew/incident-crew.component';
import { IncidentMultimediaComponent } from './incidents/incident-multimedia/incident-multimedia.component';
import { IncidentEquipmentComponent } from './incidents/incident-equipment/incident-equipment.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    NavComponent,
    ProfileComponent,
    DashboardComponent,
    NotificationsComponent,
    MapComponent,
    IncidentListComponent,
    IncidentBasicInfoComponent,
    IncidentDevicesComponent,
    IncidentResolutionComponent,
    IncidentCallsComponent,
    IncidentCrewComponent,
    IncidentMultimediaComponent,
    IncidentEquipmentComponent,
    IncidentComponent,
    DeviceListDialogComponent,
    CrewListDialogComponent,
    AddCallDialogComponent,
    SelectCustomerDialogComponent,
    WorkPlansListComponent,
    NewWorkPlansComponent,
    NewWorkPlansBasicInfoComponent,
    NewWorkPlansHistoryComponent,
    NewWorkPlansMultimediaComponent,
    NewWorkPlansEquipmentComponent,
    NewWorkPlansSwitchingInstructionsComponent,
    SafetyDocsListComponent,
    SafetyDocComponent,
    SafetyDocBasicInfoComponent,
    SafetyDocHistoryComponent,
    SafetyDocMultimediaComponent,
    SafetyDocChecklistComponent,
    DevicesListComponent,
    NewDeviceComponent,
    WorkRequestListComponent,
    WorkRequestComponent,
    WorkRequestBasicInfoComponent,
    WorkRequestHistoryComponent,
    WorkRequestMultimediaComponent,
    CrewsListComponent,
    NewCrewComponent,
    SelectMembersDialogComponent,

    MapViewComponent,

    AddSwitchingInstructionComponent,
    SelectDeviceDialogComponent,
    ConsumersListComponent,
    NewConsumerComponent,
    ReportOutageComponent,
    DeviceDetailsComponent,
    CrewDetailsComponent,
    ConsumerDetailsComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    LeafletModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
