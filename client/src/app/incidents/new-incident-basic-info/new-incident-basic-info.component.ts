import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-new-incident-basic-info',
  templateUrl: './new-incident-basic-info.component.html',
  styleUrls: ['./new-incident-basic-info.component.css']
})
export class NewIncidentBasicInfoComponent implements OnInit {
  basicInfoForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.basicInfoForm = this.fb.group({
      id: ['', Validators.required],
      typeInc: ['', [Validators.required, Validators.email]],
      priority: ['', Validators.required],
      confirmed: ['', Validators.required],
      description: ['', Validators.required],
      eta: ['', Validators.required],
      ata: ['', Validators.required],
      affectedCustomers: ['', Validators.required],
      outageTime: ['', Validators.required],
      etr: ['', Validators.required],
      calls: ['', Validators.required],
      status: ['', Validators.required],
      voltage: ['', Validators.required],
      scheduledTime: ['', Validators.required]
    })
  }

  saveBasicInfo() {
    console.log(this.basicInfoForm);
  }

}
