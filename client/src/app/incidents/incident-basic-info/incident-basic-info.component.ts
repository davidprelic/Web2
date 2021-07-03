import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Incident } from 'src/app/_models/incident';
import { AccountService } from 'src/app/_services/account.service';
import { IncidentService } from 'src/app/_services/incident.service';

@Component({
  selector: 'app-incident-basic-info',
  templateUrl: './incident-basic-info.component.html',
  styleUrls: ['./incident-basic-info.component.css']
})
export class IncidentBasicInfoComponent implements OnInit {
  basicInfoForm: FormGroup;
  incidentId: number;
  currentIncident: Incident;

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient, 
              private route: ActivatedRoute, private incidentService: IncidentService,
              private accountService: AccountService) { }

  ngOnInit(): void {
    this.incidentId = parseInt(this.route.snapshot.params['id']);

    if (this.incidentId != 0)
    {
      this.incidentService.getIncidentById(this.incidentId).subscribe(response => {
        this.currentIncident = response;
        this.initializeForm();
      });
    }
    else {
      debugger
      this.initializeForm();
    }
  }

  initializeForm() {
    this.basicInfoForm = this.fb.group({
      id: [{value: this.incidentId ? this.currentIncident.id : 0, disabled: true}],
      affectedCustomers: [{value: this.incidentId ? this.currentIncident.affectedCustomers : null, disabled: true}],
      type: [ this.incidentId ? this.currentIncident.type : '', Validators.required],
      outageTime: [{value: this.incidentId ? this.currentIncident.outageTime : '', disabled: false}, Validators.required],
      priority: [{value: this.incidentId ? this.currentIncident.priority : null, disabled: true}],
      estimatedTimetoRestore: [ this.incidentId ? this.currentIncident.estimatedTimetoRestore : null],
      isConfirmed: [ this.incidentId ? this.currentIncident.isConfirmed : false],
      numberOfCalls: [{value: this.incidentId ? this.currentIncident.numberOfCalls : null, disabled: true}],
      status: [{value: this.incidentId ? this.currentIncident.status : 'Draft', disabled: false}],
      location: [{value: this.incidentId ? this.currentIncident.location : '', disabled: false}, Validators.required],
      voltage: [ this.incidentId ? this.currentIncident.voltage : null],
      estimatedTimeOfTheCrewArrival: [ this.incidentId ? this.currentIncident.estimatedTimeOfTheCrewArrival : null],
      actualTimeOfTheCrewArrival: [ this.incidentId ? this.currentIncident.actualTimeOfTheCrewArrival : null],
      scheduledTime: [ this.incidentId ? this.currentIncident.scheduledTime : null],
    })
  }

  saveBasicInfo() {
    if (this.incidentId === 0)
    {
      this.incidentService.addNewIncident(this.basicInfoForm.getRawValue()).subscribe(response => {
        console.log(response);
        this.router.navigateByUrl('/dashboard/incidents');
      });
    }
    else 
    {
      this.incidentService.updateIncident(this.basicInfoForm.getRawValue()).subscribe(response => {
        console.log(response);
        this.router.navigateByUrl('/dashboard/incidents');
      });
    }
  }

  TakeToResolve() {
    // this.accountService.currentUser$.subscribe(response => {
    //   console.log(response.username);
    // })
  }

}
