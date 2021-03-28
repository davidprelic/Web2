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
import { SafetyDocsComponent } from './safety-docs/safety-docs.component';
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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    NavComponent,
    ProfileComponent,
    DashboardComponent,
    SafetyDocsComponent,
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
