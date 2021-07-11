import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/_services/account.service';
import { SelectMembersDialogComponent } from '../select-members-dialog/select-members-dialog.component';
import { HttpClient } from '@angular/common/http';
import { CrewService } from 'src/app/_services/crew.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-crew',
  templateUrl: './new-crew.component.html',
  styleUrls: ['./new-crew.component.css']
})
export class NewCrewComponent implements OnInit {
  model: any = {};
  newCrewForm: FormGroup;

  addrInfo = {};

  constructor(private accountService: AccountService, private fb: FormBuilder, private _snackBar: MatSnackBar,
    private router: Router, private http: HttpClient, private crewService: CrewService) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.newCrewForm = this.fb.group({
      name: ['', Validators.required]
    })
  }

  add() {
    this.crewService.addCrew(this.newCrewForm.getRawValue()).subscribe(response => {
      this._snackBar.open("Crew created!", "Succes", {
        duration: 2000,
        horizontalPosition: 'end',
        panelClass: ['mat-toolbar', 'mat-accent']
      });
      console.log(response);
      this.router.navigateByUrl('/crews');
    })
  }

  cancel() {
    this.router.navigateByUrl('/crews');
  }

}




/*@Component({
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

}*/
