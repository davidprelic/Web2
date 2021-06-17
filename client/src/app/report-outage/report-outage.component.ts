import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-report-outage',
  templateUrl: './report-outage.component.html',
  styleUrls: ['./report-outage.component.css']
})
export class ReportOutageComponent implements OnInit {
  model: any = {};
  reportOutageForm: FormGroup;

  constructor(private accountService: AccountService, private fb: FormBuilder, 
    private router: Router) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.reportOutageForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
      reason: ['', Validators.required],
      comment: ['', Validators.required],
      hazard: ['', Validators.required],
    })
  }

  report() {
    console.log('REPORTED');
  }

  getErrorMessage(fControlName: string) {
    if (this.reportOutageForm.get(fControlName).hasError('required')) {
      return 'You must enter a value';
    }
    else if (this.reportOutageForm.get(fControlName).hasError('email')) {
      return 'Not a valid email';
    }
    else {
      return '';
    }
  }


}
