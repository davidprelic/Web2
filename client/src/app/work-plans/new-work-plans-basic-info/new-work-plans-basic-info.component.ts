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
  crews: Crew[];
  emptyForm: boolean;


  constructor(private toastrService: ToastrService, private fb: FormBuilder, private incidentService: IncidentService, private crewService: CrewService, private router: Router, private http: HttpClient,
    private route: ActivatedRoute, private workPlanService: WorkPlanService, private accountService: AccountService) { }

  ngOnInit(): void {
    this.workPlanId = parseInt(this.route.snapshot.params['id']);
    this.crewService.getCrews().subscribe(response =>{
      this.crews = response;
    });

    this.incidentService.getIncidents().subscribe(response =>{
      this.incidents = response;
    });

    

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
      incidentId: [this.workPlanId ? this.currentWorkPlan.incidentId : 0],  
      address: [{value: this.workPlanId ? this.currentWorkPlan.address : '', disabled: false}],    
      latitude: [{value: this.workPlanId ? this.currentWorkPlan.latitude : 0, disabled: true}],
      longitude: [{value: this.workPlanId ? this.currentWorkPlan.longitude : 0, disabled: true}],
      type: [{value: this.workPlanId ? this.currentWorkPlan.type : '', disabled: false}, Validators.required],
      workRequestId: [this.workPlanId ? this.currentWorkPlan.workRequestId : 0],
      startDateTime: [this.workPlanId ? this.currentWorkPlan.startDateTime : '', Validators.required],
      endDateTime: [this.workPlanId ? this.currentWorkPlan.endDateTime : '', Validators.required],
      createdBy: [{value: this.workPlanId ? this.currentWorkPlan.createdBy : user.username, disabled: true}],
      purpose: [this.workPlanId ? this.currentWorkPlan.purpose : '', Validators.required],
      notes: [this.workPlanId ? this.currentWorkPlan.notes : ''],
      company: [this.workPlanId ? this.currentWorkPlan.company: ''],      
      phoneNumber: [this.workPlanId ? this.currentWorkPlan.phoneNumber: ''],
      status: [{value: this.workPlanId ? this.currentWorkPlan.status : 'Draft', disabled: false}],    
      dateTimeCreated: [{value: this.workPlanId ? this.currentWorkPlan.dateTimeCreated : new Date(), disabled: true}],
      crewId: [this.workPlanId ? this.currentWorkPlan.crewId: 0]
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

  changeWorkPlan(id: number){
    //implementiraj ovde kad se izmeni workplan
  }

  delete(){
    this.workPlanService.deleteWorkPlan(this.workPlanId).subscribe(response => {
      this.router.navigateByUrl('/dashboard/work-plans');
      this.toastrService.success('Successfully deleted new work plan');
    });
  }
}
