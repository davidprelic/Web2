import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';import { ActivatedRoute, Router } from '@angular/router';
import { Crew } from 'src/app/_models/crew';
import { Incident } from 'src/app/_models/incident';
import { WorkPlan } from 'src/app/_models/work-plan';
import { AccountService } from 'src/app/_services/account.service';
import { CrewService } from 'src/app/_services/crew.service';
import { IncidentService } from 'src/app/_services/incident.service';
import { WorkPlanService } from 'src/app/_services/work-plan.service';
import { ToastrService } from 'ngx-toastr';
import { WorkRequestService } from 'src/app/_services/work-request.service';
import { WorkRequest } from 'src/app/_models/work-request';

@Component({
  selector: 'app-new-work-plans-basic-info',
  templateUrl: './new-work-plans-basic-info.component.html',
  styleUrls: ['./new-work-plans-basic-info.component.css']
})
export class NewWorkPlansBasicInfoComponent implements OnInit {
  basicInfoForm: FormGroup;
  workPlanId: number;
  currentWorkPlan: WorkPlan;
  
  sendWorkPlan: WorkPlan;
  //workRequests: WorkRequest[];
  incidents: Incident[];
  workRequests: WorkRequest[];
  crews: Crew[];
  emptyForm: boolean;
  userRole: string;


  constructor(private workRequestService: WorkRequestService, private toastrService: ToastrService, private fb: FormBuilder, private incidentService: IncidentService, private crewService: CrewService, private router: Router, private http: HttpClient,
    private route: ActivatedRoute, private workPlanService: WorkPlanService, private accountService: AccountService) { }

  ngOnInit(): void {
    var user = JSON.parse(localStorage.getItem('user'));
    this.userRole = user.userRole;

    this.workPlanId = parseInt(this.route.snapshot.params['id']);
    this.crewService.getCrews().subscribe(response =>{
      this.crews = response;
    });

    this.incidentService.getIncidents().subscribe(response =>{
      this.incidents = response;
    });

    this.workRequestService.getWorkRequests().subscribe(response =>{
      this.workRequests = response;
    })

    

    if(this.workPlanId != 0){
      this.workPlanService.getWorkPlanById(this.workPlanId).subscribe(response =>{
        this.currentWorkPlan = response;
        this.initializeForm();
      });
    }
    else{
      this.emptyForm = true;
      this.initializeForm();
    }
  
    
  }

  initializeForm() {
    var user = JSON.parse(localStorage.getItem('user'));
    this.basicInfoForm = this.fb.group({
      id: [{value: this.workPlanId ? this.currentWorkPlan.id : 0, disabled: true}],
      incidentId: [{value: this.workPlanId ? this.currentWorkPlan.incidentId : 0, disabled: (this.userRole != "Dispatcher") ? true : false}],  
      address: [{value: this.workPlanId ? this.currentWorkPlan.address : '', disabled: true}],    
      latitude: [{value: this.workPlanId ? this.currentWorkPlan.latitude : 0, disabled: true}],
      longitude: [{value: this.workPlanId ? this.currentWorkPlan.longitude : 0, disabled: true}],
      type: [{value: this.workPlanId ? this.currentWorkPlan.type : '', disabled: (this.userRole != "Dispatcher") ? true : false}, Validators.required],
      workRequestId: [{value: this.workPlanId ? this.currentWorkPlan.workRequestId : 0, disabled: (this.userRole != "Dispatcher") ? true : false}, Validators.required],
      startDateTime: [{value: this.workPlanId ? this.currentWorkPlan.startDateTime : '',disabled: (this.userRole != "Dispatcher") ? true : false}, Validators.required],
      endDateTime: [{value: this.workPlanId ? this.currentWorkPlan.endDateTime : '',disabled: (this.userRole != "Dispatcher") ? true : false}, Validators.required],
      createdBy: [{value: this.workPlanId ? this.currentWorkPlan.createdBy : user.username, disabled: true}],
      purpose: [{value: this.workPlanId ? this.currentWorkPlan.purpose : '',disabled: (this.userRole != "Dispatcher") ? true : false}, Validators.required],
      notes: [{value: this.workPlanId ? this.currentWorkPlan.notes : '', disabled: (this.userRole != "Dispatcher") ? true : false}],
      company: [{value: this.workPlanId ? this.currentWorkPlan.company: '', disabled: (this.userRole != "Dispatcher") ? true : false}],      
      phoneNumber: [{value: this.workPlanId ? this.currentWorkPlan.phoneNumber: '', disabled: (this.userRole != "Dispatcher") ? true : false}],
      status: [{value: this.workPlanId ? this.currentWorkPlan.status : 'Draft', disabled: true}],    
      dateTimeCreated: [{value: this.workPlanId ? this.currentWorkPlan.dateTimeCreated : new Date(), disabled: true}],
      crewId: [{value: this.workPlanId ? this.currentWorkPlan.crewId: 0, disabled: (this.userRole != "Dispatcher") ? true : false}]
    });
    console.log(this.basicInfoForm);
  }

  saveBasicInfo() {
    if(this.workPlanId === 0){
      this.workPlanService.addNewWorkPlan(this.basicInfoForm.getRawValue()).subscribe(response =>{
        this.router.navigateByUrl('/dashboard/work-plans');
        this.toastrService.success('Successfully added new work plan');
      });
    }
    else{
      this.workPlanService.updateWorkPlan(this.basicInfoForm.getRawValue()).subscribe(response=>{
        this.router.navigateByUrl('/dashboard/work-plans');
        this.toastrService.success('Successfully updated work plan');
      });
    }
  }

  Cancel(){
    this.router.navigateByUrl('/dashboard/work-plans');
  }

  changeIncident(id: number){
    this.incidentService.getIncidentById(id).subscribe(response=>{
      this.basicInfoForm.controls['address'].setValue(response.location);
      this.basicInfoForm.controls['latitude'].setValue(response.latitude);
      this.basicInfoForm.controls['longitude'].setValue(response.longitude);
    })  
  }

  changeWorkRequest(id: number){
    this.workRequestService.getWorkRequestById(id).subscribe(response => {
      this.basicInfoForm.controls['address'].setValue(response.address);
      this.basicInfoForm.controls['latitude'].setValue(response.latitude);
      this.basicInfoForm.controls['longitude'].setValue(response.longitude);
      this.basicInfoForm.controls['incidentId'].setValue(response.incidentId);
    })
  }

  delete(){
    this.workPlanService.deleteWorkPlan(this.workPlanId).subscribe(response => {
      this.router.navigateByUrl('/dashboard/work-plans');
      this.toastrService.success('Successfully deleted new work plan');
    });
  }
}
