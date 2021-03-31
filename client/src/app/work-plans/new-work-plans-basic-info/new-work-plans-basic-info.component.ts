import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';;

@Component({
  selector: 'app-new-work-plans-basic-info',
  templateUrl: './new-work-plans-basic-info.component.html',
  styleUrls: ['./new-work-plans-basic-info.component.css']
})
export class NewWorkPlansBasicInfoComponent implements OnInit {
  basicInfoForm: FormGroup;
  valueIncId = '';
  valueWorkReqId = '';
  valueFieldCrew = '';

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.basicInfoForm = this.fb.group({
      status: ['', Validators.required],    
      incId: ['', Validators.required],      
      typeDoc: ['', Validators.required],
      workReqId: ['', Validators.required],
      typeOfWork: ['', Validators.required],
      startDateTime: ['', Validators.required],
      endDateTime: ['', Validators.required],
      createdBy: ['', Validators.required],
      purpose: ['', Validators.required],
      details: ['', Validators.required],
      notes: ['', Validators.required],
      company: ['', Validators.required],      
      phoneNo: ['', Validators.required],
      dateTimeCreated: ['', Validators.required],
      fieldCrew: ['', Validators.required]
    })
  }

  saveBasicInfo() {
    console.log(this.basicInfoForm);
  }

}
