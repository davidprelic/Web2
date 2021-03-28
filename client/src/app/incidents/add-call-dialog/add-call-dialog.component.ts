import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SelectCustomerDialogComponent } from '../select-customer-dialog/select-customer-dialog.component';

export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}

@Component({
  selector: 'app-add-call-dialog',
  templateUrl: './add-call-dialog.component.html',
  styleUrls: ['./add-call-dialog.component.css']
})
export class AddCallDialogComponent implements OnInit {
  addCallForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private fb: FormBuilder, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.addCallForm = this.fb.group({
      reason: ['', Validators.required],
      comment: ['', Validators.required],
      hazard: ['', Validators.required]
    })
  }

  addCall() {
    console.log(this.addCallForm.value);
    // this.accountService.register(this.model);
  }

  openDialog() {
    this.dialog.open(SelectCustomerDialogComponent, {
      data: {
        animal: 'panda'
      }
    });
  }

}
