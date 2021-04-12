import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-new-device',
  templateUrl: './new-device.component.html',
  styleUrls: ['./new-device.component.css']
})
export class NewDeviceComponent implements OnInit {
  model: any = {};
  newDeviceForm: FormGroup;

  constructor(private accountService: AccountService, private fb: FormBuilder, 
    private router: Router) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.newDeviceForm = this.fb.group({
      deviceType: ['', Validators.required],
      id: ['', Validators.required],
      name: [{value: 'PRE1', disabled: true}, Validators.required],
      address: ['', Validators.required],
      coordinates: ['', Validators.required]
    })
  }

  add() {
    console.log(this.newDeviceForm.value);
    // this.accountService.register(this.model);
  }

  cancel() {
    console.log('cancel');
  }

}
