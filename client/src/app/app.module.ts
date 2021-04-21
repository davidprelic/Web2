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
import { NewIncidentBasicInfoComponent } from './incidents/new-incident-basic-info/new-incident-basic-info.component';
import { NewIncidentDevicesComponent } from './incidents/new-incident-devices/new-incident-devices.component';
import { NewIncidentResolutionComponent } from './incidents/new-incident-resolution/new-incident-resolution.component';
import { NewIncidentCallsComponent } from './incidents/new-incident-calls/new-incident-calls.component';
import { NewIncidentCrewComponent } from './incidents/new-incident-crew/new-incident-crew.component';
import { NewIncidentMultimediaComponent } from './incidents/new-incident-multimedia/new-incident-multimedia.component';
import { NewIncidentEquipmentComponent } from './incidents/new-incident-equipment/new-incident-equipment.component';
import { NewIncidentComponent } from './incidents/new-incident/new-incident.component';
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
import { SearchElementsComponent } from './search-elements/search-elements.component';
import { WorkRequestListComponent } from './work-requests/work-request-list/work-request-list.component';
import { WorkRequestComponent } from './work-requests/work-request/work-request.component';
import { WorkRequestBasicInfoComponent } from './work-requests/work-request-basic-info/work-request-basic-info.component';
import { WorkRequestHistoryComponent } from './work-requests/work-request-history/work-request-history.component';
import { WorkRequestMultimediaComponent } from './work-requests/work-request-multimedia/work-request-multimedia.component';

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
    NewIncidentBasicInfoComponent,
    NewIncidentDevicesComponent,
    NewIncidentResolutionComponent,
    NewIncidentCallsComponent,
    NewIncidentCrewComponent,
    NewIncidentMultimediaComponent,
    NewIncidentEquipmentComponent,
    NewIncidentComponent,
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
    SearchElementsComponent,
    WorkRequestListComponent,
    WorkRequestComponent,
    WorkRequestBasicInfoComponent,
    WorkRequestHistoryComponent,
    WorkRequestMultimediaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
