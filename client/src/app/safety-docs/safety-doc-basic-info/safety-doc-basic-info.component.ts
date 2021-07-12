import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { endWith } from 'rxjs/operators';
import { Crew } from 'src/app/_models/crew';
import { SafetyDocument } from 'src/app/_models/safety-document';
import { WorkPlan } from 'src/app/_models/work-plan';
import { AccountService } from 'src/app/_services/account.service';
import { CrewService } from 'src/app/_services/crew.service';
import { SafetyDocService } from 'src/app/_services/safety-doc.service';
import { WorkPlanService } from 'src/app/_services/work-plan.service';

@Component({
  selector: 'app-safety-doc-basic-info',
  templateUrl: './safety-doc-basic-info.component.html',
  styleUrls: ['./safety-doc-basic-info.component.css']
})
export class SafetyDocBasicInfoComponent implements OnInit {
  basicInfoForm: FormGroup;
  safetyDocId: number;
  currentSafetyDoc: SafetyDocument;
  crews: Crew[];
  workPlans: WorkPlan[];
  userRole: string;

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient,
              private route: ActivatedRoute, private safetyDocService: SafetyDocService,
              private accountService: AccountService, private _snackBar: MatSnackBar, private crewService: CrewService,
              private workPlanService: WorkPlanService) { }

  ngOnInit(): void {
    var user = JSON.parse(localStorage.getItem('user'));
    this.userRole = user.userRole;

    this.safetyDocId = parseInt(this.route.snapshot.params['id']);

    this.crewService.getCrews().subscribe(response =>{
      this.crews = response;
    });

    this.workPlanService.getWorkPlans().subscribe(response =>{
      this.workPlans = response;
    });

    if (this.safetyDocId != 0)
    {
      this.safetyDocService.getSafetyDocById(this.safetyDocId).subscribe(response => {
        this.currentSafetyDoc = response;
        this.initializeForm();
      });
    }
    else {
      this.initializeForm();
    }
  }

  initializeForm() {
    var user = JSON.parse(localStorage.getItem('user'));
    this.basicInfoForm = this.fb.group({
      id: [{value: this.safetyDocId ? this.currentSafetyDoc.id : 0, disabled: true}],
      type: [ {value :this.safetyDocId ? this.currentSafetyDoc.type : '', disabled: (this.userRole != "Dispatcher") ? true : false}, Validators.required],
      status: [{value: this.safetyDocId ? this.currentSafetyDoc.status : 'Draft', disabled: true}],
      createdBy: [{value: this.safetyDocId ? this.currentSafetyDoc.createdBy : user.username, disabled: true}],
      details: [{value: this.safetyDocId ? this.currentSafetyDoc.details : '', disabled: (this.userRole != "Dispatcher") ? true : false}],
      notes: [{value: this.safetyDocId ? this.currentSafetyDoc.notes : '', disabled: (this.userRole != "Dispatcher") ? true : false}],
      phoneNumber: [{value: this.safetyDocId ? this.currentSafetyDoc.phoneNumber : '', disabled: (this.userRole != "Dispatcher") ? true : false}],
      dateTimeCreated: [{value: this.safetyDocId ? this.currentSafetyDoc.dateTimeCreated : null, disabled: true}],
      workPlanId: [{value: this.safetyDocId ? this.currentSafetyDoc.workPlanId : 0, disabled: (this.userRole != "Dispatcher") ? true : false}],
      crewId: [{value: this.safetyDocId ? this.currentSafetyDoc.crewId: 0, disabled: (this.userRole != "Dispatcher") ? true : false}]
    })
  }

  saveBasicInfo() {
    if (this.safetyDocId === 0)
    {
      this.safetyDocService.addNewSafetyDoc(this.basicInfoForm.getRawValue()).subscribe(response => {
        console.log(response);
        this.router.navigateByUrl('/dashboard/safety-docs');
        this._snackBar.open("New safety document added!", "Succes", {
          duration: 2000,
          horizontalPosition: 'end',
          panelClass: ['mat-toolbar', 'mat-accent']
        } );
      });
    }
    else
    {
      this.safetyDocService.updateSafetyDoc(this.basicInfoForm.getRawValue()).subscribe(response => {
        console.log(response);
        this._snackBar.open("Basic info changes saved!", "Succes", {
          duration: 2000,
          horizontalPosition: 'end',
          panelClass: ['mat-toolbar', 'mat-accent']
        } );
        // this.router.navigateByUrl('/dashboard/safety-docs');
      });
    }
  }

  Cancel() {
    this.router.navigateByUrl('/dashboard/safety-docs');
  }

  changeWorkPlan(id: number){
    this.workPlanService.getWorkPlanById(id).subscribe(response=>{
      // this.basicInfoForm.controls['longitude'].setValue(response.longitude);
    })
  }

  delete(){
    this.safetyDocService.deleteSafetyDoc(this.safetyDocId).subscribe(response => {
      this.router.navigateByUrl('/dashboard/safety-docs');
      this._snackBar.open("Safety doc is deleted!", "Succes", {
        duration: 2000,
        horizontalPosition: 'end',
        panelClass: ['mat-toolbar', 'mat-accent']
      } );
    });
  }

}
