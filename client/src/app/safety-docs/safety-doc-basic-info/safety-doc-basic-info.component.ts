import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SafetyDocument } from 'src/app/_models/safety-document';
import { AccountService } from 'src/app/_services/account.service';
import { SafetyDocService } from 'src/app/_services/safety-doc.service';

@Component({
  selector: 'app-safety-doc-basic-info',
  templateUrl: './safety-doc-basic-info.component.html',
  styleUrls: ['./safety-doc-basic-info.component.css']
})
export class SafetyDocBasicInfoComponent implements OnInit {
  basicInfoForm: FormGroup;
  safetyDocId: number;
  currentSafetyDoc: SafetyDocument;
  
  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient, 
              private route: ActivatedRoute, private safetyDocService: SafetyDocService,
              private accountService: AccountService) { }

  ngOnInit(): void {
    this.safetyDocId = parseInt(this.route.snapshot.params['id']);

    if (this.safetyDocId != 0)
    {
      this.safetyDocService.getSafetyDocById(this.safetyDocId).subscribe(response => {
        this.currentSafetyDoc = response;
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
      type: [ this.safetyDocId ? this.currentSafetyDoc.type : '', Validators.required],
      status: [{value: this.safetyDocId ? this.currentSafetyDoc.status : 'Draft', disabled: false}],
      // OVDE IZ LOCAL STORAGE POKUPITI INFO PA UZETI ID ULOGOVANOG USERA I ISPISATI NJEGOV INFO
      createdBy: [{value: 23, disabled: true}],
      details: [{value: this.safetyDocId ? this.currentSafetyDoc.details : '', disabled: false}],
      notes: [{value: this.safetyDocId ? this.currentSafetyDoc.notes : '', disabled: false}],
      phoneNumber: [{value: this.safetyDocId ? this.currentSafetyDoc.phoneNumber : '', disabled: false}, Validators.required],
      dateTimeCreated: [ this.safetyDocId ? this.currentSafetyDoc.dateTimeCreated : null],
      // OVDE BOLJE STAVITI WorkPlanName PA NA OSNOVU NJEGA UZETI ID I KAD KLIKNEM SAVE PROSLEDITI TAJ WorkPlanId
      workPlanId: [''],
      // OVDE BOLJE STAVITI CrewName PA NA OSNOVU NJEGA UZETI ID I KAD KLIKNEM SAVE PROSLEDITI TAJ CrewId
      crewId: ['']
      // safetyDocType: ['', Validators.required],
    })
  }

  saveBasicInfo() {
    if (this.safetyDocId === 0)
    {
      this.safetyDocService.addNewSafetyDoc(this.basicInfoForm.getRawValue()).subscribe(response => {
        console.log(response);
        this.router.navigateByUrl('/dashboard/safety-docs');
      });
    }
    else 
    {
      this.safetyDocService.updateSafetyDoc(this.basicInfoForm.getRawValue()).subscribe(response => {
        console.log(response);
        this.router.navigateByUrl('/dashboard/safety-docs');
      });
    }
  }

}
