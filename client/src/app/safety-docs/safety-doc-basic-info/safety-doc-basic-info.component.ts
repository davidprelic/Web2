import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-safety-doc-basic-info',
  templateUrl: './safety-doc-basic-info.component.html',
  styleUrls: ['./safety-doc-basic-info.component.css']
})
export class SafetyDocBasicInfoComponent implements OnInit {
  basicInfoForm: FormGroup;
  
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.basicInfoForm = this.fb.group({
      type: ['', Validators.required],
      status: ['', Validators.required],
      planId: ['', Validators.required],
      // safetyDocType: ['', Validators.required],
      dateTimeCreated: ['', Validators.required],
      createdBy: ['', Validators.required],
      details: ['', Validators.required],
      notes: ['', Validators.required],
      phoneNo: ['', Validators.required],
      fieldCrew: ['', Validators.required]
    })
  }

  saveBasicInfo() {
    console.log(this.basicInfoForm);
  }

}
