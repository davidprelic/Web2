import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-new-consumer',
  templateUrl: './new-consumer.component.html',
  styleUrls: ['./new-consumer.component.css']
})
export class NewConsumerComponent implements OnInit {
  model: any = {};
  newConsumerForm: FormGroup;

  constructor(private accountService: AccountService, private fb: FormBuilder, 
    private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.newConsumerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      priority: ['', Validators.required],
      number: ['', Validators.required],
      id: ['', Validators.required],
      type: ['', Validators.required],
    })
  }

  add() {
    console.log(this.newConsumerForm.value);
    // this.accountService.register(this.model);
  }

  cancel() {
    console.log('cancel');
  }

}
