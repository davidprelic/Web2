import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Incident } from 'src/app/_models/incident';
import { AccountService } from 'src/app/_services/account.service';
import { IncidentService } from 'src/app/_services/incident.service';

@Component({
  selector: 'app-incident-basic-info',
  templateUrl: './incident-basic-info.component.html',
  styleUrls: ['./incident-basic-info.component.css']
})
export class IncidentBasicInfoComponent implements OnInit {
  basicInfoForm: FormGroup;
  incidentId: number;
  currentIncident: Incident;
  location: string;
  locationWords: string[];
  requestLatLonString: string;

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient, 
              private route: ActivatedRoute, private incidentService: IncidentService,
              private accountService: AccountService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.incidentId = parseInt(this.route.snapshot.params['id']);

    if (this.incidentId != 0)
    {
      this.incidentService.getIncidentById(this.incidentId).subscribe(response => {
        this.currentIncident = response;
        this.initializeForm();
      });
    }
    else {
      this.initializeForm();
    }
  }

  initializeForm() {
    this.basicInfoForm = this.fb.group({
      id: [{value: this.incidentId ? this.currentIncident.id : 0, disabled: true}],
      affectedCustomers: [{value: this.incidentId ? this.currentIncident.affectedCustomers : null, disabled: true}],
      type: [ this.incidentId ? this.currentIncident.type : '', Validators.required],
      outageTime: [{value: this.incidentId ? this.currentIncident.outageTime : '', disabled: false}, Validators.required],
      priority: [{value: this.incidentId ? this.currentIncident.priority : null, disabled: true}],
      estimatedTimetoRestore: [ this.incidentId ? this.currentIncident.estimatedTimetoRestore : null],
      isConfirmed: [ this.incidentId ? this.currentIncident.isConfirmed : false],
      numberOfCalls: [{value: this.incidentId ? this.currentIncident.numberOfCalls : null, disabled: true}],
      status: [{value: this.incidentId ? this.currentIncident.status : 'Draft', disabled: false}],
      location: [{value: this.incidentId ? this.currentIncident.location : '', disabled: false}, Validators.required],
      voltage: [ this.incidentId ? this.currentIncident.voltage : null],
      estimatedTimeOfTheCrewArrival: [ this.incidentId ? this.currentIncident.estimatedTimeOfTheCrewArrival : null],
      actualTimeOfTheCrewArrival: [ this.incidentId ? this.currentIncident.actualTimeOfTheCrewArrival : null],
      scheduledTime: [ this.incidentId ? this.currentIncident.scheduledTime : null],
      latitude: [null],
      longitude: [null]

    })
  }

  saveBasicInfo() {
    if (this.incidentId === 0)
    {
      this.location = this.basicInfoForm.controls['location'].value;
      this.locationWords = this.location.split(" ");
      console.log(this.locationWords);

      // 'https://nominatim.openstreetmap.org/search.php?q=bulevar+cara+lazara+39&format=jsonv2'

      this.requestLatLonString = 'https://nominatim.openstreetmap.org/search.php?q=';
      this.locationWords.forEach(element => {
        this.requestLatLonString += element + '+';
      });
      this.requestLatLonString = this.requestLatLonString.substring(0, this.requestLatLonString.length - 1);
      this.requestLatLonString += '&format=jsonv2';

      console.log(this.requestLatLonString);
      this.http.get(this.requestLatLonString).subscribe(response => {
        // console.log(response[0].lat);
        // console.log(response[0].lon);

        this.basicInfoForm.patchValue({
          latitude: response[0].lat, 
          longitude: response[0].lon
        });
        
        this.incidentService.addNewIncident(this.basicInfoForm.getRawValue()).subscribe(response => {
          console.log(response);
          this.router.navigateByUrl('/dashboard/incidents');
          this._snackBar.open("New incident added!", "Succes", {
            duration: 2000,
            horizontalPosition: 'end',
            panelClass: ['mat-toolbar', 'mat-accent']
          } );
        });
      });
      
    }
    else 
    {
      this.incidentService.updateIncident(this.basicInfoForm.getRawValue()).subscribe(response => {
        console.log(response);
        this._snackBar.open("Basic info changes saved!", "Succes", {
          duration: 2000,
          horizontalPosition: 'end',
          panelClass: ['mat-toolbar', 'mat-accent']
        } );
        // this.router.navigateByUrl('/dashboard/incidents');
      });
    }
  }

  // TakeToResolve() {
  //   this.accountService.currentUser$.subscribe(response => {
  //     console.log(response.username);
  //   })
  // }

  Cancel() {
    this.router.navigateByUrl('/dashboard/incidents');
  }

}
