import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SelectDeviceDialogComponent } from '../select-device-dialog/select-device-dialog.component';

export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}

@Component({
  selector: 'app-add-switching-instruction',
  templateUrl: './add-switching-instruction.component.html',
  styleUrls: ['./add-switching-instruction.component.css']
})
export class AddSwitchingInstructionComponent implements OnInit {
  addInstructionForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private fb: FormBuilder, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.addInstructionForm = this.fb.group({
      comment: ['', Validators.required],    
    })
  }

  addInstruction() {
    console.log(this.addInstructionForm.value);
    // this.accountService.register(this.model);
  }

  openDialog() {
    this.dialog.open(SelectDeviceDialogComponent, {
      data: {
        animal: 'panda'
      }
    });
  }

}
