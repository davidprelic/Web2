import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Call } from 'src/app/_models/call';
import { CallService } from 'src/app/_services/call.service';
import { IncidentService } from 'src/app/_services/incident.service';
import { SelectCustomerDialogComponent } from '../select-customer-dialog/select-customer-dialog.component';

@Component({
  selector: 'app-add-call-dialog',
  templateUrl: './add-call-dialog.component.html',
  styleUrls: ['./add-call-dialog.component.css']
})
export class AddCallDialogComponent implements OnInit {
  addCallForm: FormGroup;
  currentCall: Call; 

  constructor(@Inject(MAT_DIALOG_DATA) public data: {incId: number}, private fb: FormBuilder, 
              public dialog: MatDialog, private callService: CallService, private incidentService: IncidentService) { }

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
    this.incidentService.getIncidentById(this.data.incId).subscribe(response => {
      this.currentCall =
      {
        reason: this.addCallForm.get('reason').value,
        comment: this.addCallForm.get('comment').value,
        hazard: this.addCallForm.get('hazard').value,
        location: response.location,
        latitude: response.latitude,
        longitude: response.longitude
      }
      
      this.callService.addNewCall(this.currentCall).subscribe(response => {
        console.log(response);
      });
    });
  }

  openDialog() {
    this.dialog.open(SelectCustomerDialogComponent, {
      data: {
        animal: 'panda'
      }
    });
  }

}
