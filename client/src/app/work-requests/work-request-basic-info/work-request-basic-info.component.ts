import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core'; import { ActivatedRoute, Router } from '@angular/router';
import { Incident } from 'src/app/_models/incident';
import { WorkRequest } from 'src/app/_models/work-request';
import { AccountService } from 'src/app/_services/account.service';
import { IncidentService } from 'src/app/_services/incident.service';
import { WorkRequestService } from 'src/app/_services/work-request.service';
;

@Component({
  selector: 'app-work-request-basic-info',
  templateUrl: './work-request-basic-info.component.html',
  styleUrls: ['./work-request-basic-info.component.css']
})
export class WorkRequestBasicInfoComponent implements OnInit {
  basicInfoForm: FormGroup;
  workRequestId: number;
  currentWorkRequest: WorkRequest;

  sendWorkRequest: WorkRequest;
  incidents: Incident[];
  emptyForm: boolean;


  constructor(private fb: FormBuilder, private incidentService: IncidentService, private router: Router, private http: HttpClient,
    private route: ActivatedRoute, private workRequestService: WorkRequestService, private accountService: AccountService) { }

  ngOnInit(): void {
    this.workRequestId = parseInt(this.route.snapshot.params['id']);

    this.incidentService.getIncidents().subscribe(response => {
      this.incidents = response;
    });

    if (this.workRequestId != 0) {
      this.workRequestService.getWorkRequestById(this.workRequestId).subscribe(response => {
        this.currentWorkRequest = response;
        this.initializeForm();
      });
    }
    else {
      this.emptyForm = true;
      this.initializeForm();
    }
  }

  initializeForm() {
    var user = JSON.parse(localStorage.getItem('user'));
    this.basicInfoForm = this.fb.group({
      id: [{ value: this.workRequestId ? this.currentWorkRequest.id : 0, disabled: true }],
      incidentId: [this.workRequestId ? this.currentWorkRequest.incidentId : 0],
      address: [{ value: this.workRequestId ? this.currentWorkRequest.address : '', disabled: true }, Validators.required],
      latitude: [{ value: this.workRequestId ? this.currentWorkRequest.latitude : 0, disabled: true }],
      longitude: [{ value: this.workRequestId ? this.currentWorkRequest.longitude : 0, disabled: true }],
      type: [{ value: this.workRequestId ? this.currentWorkRequest.type : '', disabled: false }, Validators.required],
      startDateTime: [this.workRequestId ? this.currentWorkRequest.startDateTime : '', Validators.required],
      endDateTime: [this.workRequestId ? this.currentWorkRequest.endDateTime : '', Validators.required],
      createdBy: [{ value: this.workRequestId ? this.currentWorkRequest.createdBy : user.username, disabled: true }],
      purpose: [this.workRequestId ? this.currentWorkRequest.purpose : '', Validators.required],
      notes: [this.workRequestId ? this.currentWorkRequest.notes : ''],
      emergencyWork: [this.workRequestId ? this.currentWorkRequest.emergencyWork : false],
      company: [this.workRequestId ? this.currentWorkRequest.company : ''],
      phoneNumber: [this.workRequestId ? this.currentWorkRequest.phoneNumber : ''],
      status: [{ value: this.workRequestId ? this.currentWorkRequest.status : 'Draft', disabled: false }],
      dateTimeCreated: [{ value: this.workRequestId ? this.currentWorkRequest.dateTimeCreated : new Date(), disabled: true }]
    });
  }

  saveBasicInfo() {
    if (this.workRequestId === 0) {
      this.workRequestService.addNewWorkRequest(this.basicInfoForm.getRawValue()).subscribe(response => {
        this.router.navigateByUrl('/dashboard/work-requests');
      });
    }
    else {
      this.workRequestService.updateWorkRequest(this.basicInfoForm.getRawValue()).subscribe(response => {
        this.router.navigateByUrl('/dashboard/work-requests');
      });
    }
  }

  Delete() {
    if (this.workRequestId != 0) {
      this.workRequestService.deleteWorkRequest(this.workRequestId).subscribe(response => {
        this.router.navigateByUrl('/dashboard/work-requests');
      });
    }
  }

  Cancel() {
    this.router.navigateByUrl('/dashboard/work-requests');
  }

  changeIncident(id: number) {
    this.incidentService.getIncidentById(id).subscribe(response => {
      this.basicInfoForm.controls['address'].setValue(response.location);
      this.basicInfoForm.controls['latitude'].setValue(response.latitude);
      this.basicInfoForm.controls['longitude'].setValue(response.longitude);
    })
  }

  changeWorkRequest(id: number) {
    //implementiraj ovde kad se izmeni workRequest
  }
}
