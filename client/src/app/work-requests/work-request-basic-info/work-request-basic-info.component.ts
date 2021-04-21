import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-work-request-basic-info',
  templateUrl: './work-request-basic-info.component.html',
  styleUrls: ['./work-request-basic-info.component.css']
})
export class WorkRequestBasicInfoComponent implements OnInit {
  basicInfoForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.basicInfoForm = this.fb.group({
      type: ['', Validators.required],
      status: ['', Validators.required],
      dateTimeCreated: ['', Validators.required],
      startDateTime: ['', Validators.required],
      endDateTime: ['', Validators.required],
      details: ['', Validators.required],
      notes: ['', Validators.required],
      phoneNo: ['', Validators.required],
      createdBy: ['', Validators.required],
      purpose: ['', Validators.required],
      company: ['', Validators.required],
      address: ['', Validators.required],
      incident: ['', Validators.required],
      emergencyWork: ['', Validators.required],
    })
  }

  saveBasicInfo() {
    console.log(this.basicInfoForm);
  }

}
