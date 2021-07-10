import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Call } from 'src/app/_models/call';
import { Customer } from 'src/app/_models/customer';
import { CustomerItem } from 'src/app/_models/customer-item';
import { CallService } from 'src/app/_services/call.service';
import { ConsumerService } from 'src/app/_services/consumer.service';
import { IncidentService } from 'src/app/_services/incident.service';
import { SelectCustomerDialogComponent } from '../select-customer-dialog/select-customer-dialog.component';

@Component({
  selector: 'app-add-call-dialog',
  templateUrl: './add-call-dialog.component.html',
  styleUrls: ['./add-call-dialog.component.css']
})
export class AddCallDialogComponent implements OnInit {
  incidentId: number;
  addCallForm: FormGroup;
  currentCall: Call;
  selectedCustomer: Customer; 
  selectedCustomerId: number; 
  customerInfo: FormGroup;


  constructor(@Inject(MAT_DIALOG_DATA) public data: {incId: number}, private fb: FormBuilder, 
              public dialog: MatDialog, private callService: CallService, private incidentService: IncidentService,
              private route: ActivatedRoute, private consumerService: ConsumerService,
              private dialogRef: MatDialogRef<AddCallDialogComponent>) { }

  ngOnInit(): void {
    this.incidentId = this.route.snapshot.params['id'];
    this.initializeForm();
    this.initializeCustomerInfoForm();
  }

  initializeForm() {
    this.addCallForm = this.fb.group({
      reason: ['', Validators.required],
      comment: ['', Validators.required],
      hazard: ['', Validators.required]
    })
  }

  initializeCustomerInfoForm() {
    this.customerInfo = this.fb.group({
      name: [{value: '', disabled: true}, Validators.required],
      lastName: [{value: '', disabled: true}, Validators.required],
      phoneNumber: [{value: '', disabled: true}, Validators.required]
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
        longitude: response.longitude,
        customerId: this.selectedCustomerId 
      }
      this.callService.addNewCall(this.currentCall).subscribe(response => {
        console.log(response);
        this.dialogRef.close({ data: 1 })
      });
    });
  }

  cancel() {
    // closing itself and sending data to parent component
    this.dialogRef.close({ data: 0 })
  }

  openDialog() {
    this.dialog.open(SelectCustomerDialogComponent, {
      data: {
        incId: this.incidentId
      }
    }).afterClosed().subscribe(res => {
      if (res.data > 0 && res.data != undefined)
      {
        this.selectedCustomerId = res.data;
        this.consumerService.getConsumerById(res.data).subscribe(response => {
          this.selectedCustomer = response;
          this.customerInfo.setValue({name: this.selectedCustomer.name, lastName: this.selectedCustomer.lastName, phoneNumber: this.selectedCustomer.phoneNumber});
        }); 
        
      }
    });
  }

}
