import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/_services/account.service';
import { SelectMembersDialogComponent } from '../select-members-dialog/select-members-dialog.component';

@Component({
  selector: 'app-new-crew',
  templateUrl: './new-crew.component.html',
  styleUrls: ['./new-crew.component.css']
})
export class NewCrewComponent implements OnInit {
  model: any = {};
  newCrewForm: FormGroup;

  constructor(private accountService: AccountService, private fb: FormBuilder, 
    private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.newCrewForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
    })
  }

  add() {
    console.log(this.newCrewForm.value);
    // this.accountService.register(this.model);
  }

  cancel() {
    console.log('cancel');
  }

  openDialog() {
    this.dialog.open(SelectMembersDialogComponent);
  }

}
