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
  takenToResolveToggle: boolean;
  userRole: string;

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient, 
              private route: ActivatedRoute, private incidentService: IncidentService,
              private accountService: AccountService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    var user = JSON.parse(localStorage.getItem('user'));
    this.userRole = user.userRole;

    this.takenToResolveToggle = false;
    this.incidentId = parseInt(this.route.snapshot.params['id']);

    if (this.incidentId != 0)
    {
      this.incidentService.getIncidentById(this.incidentId).subscribe(response => {
        this.currentIncident = response;
        this.initializeForm();
        if (this.currentIncident.userId != null)
        {
          this.takenToResolveToggle = true;
        }
      });
    }
    else {
      this.takenToResolveToggle = true;
      this.initializeForm();
    }
  }

  initializeForm() {
    var user = JSON.parse(localStorage.getItem('user'));
    this.basicInfoForm = this.fb.group({
      id: [{value: this.incidentId ? this.currentIncident.id : 0, disabled: true}],
      affectedCustomers: [{value: this.incidentId ? this.currentIncident.affectedCustomers : null, disabled: true}],
      type: [ {value: this.incidentId ? this.currentIncident.type : '', disabled: (this.userRole != "Dispatcher") ? true : false}, Validators.required],
      outageTime: [{value: this.incidentId ? this.currentIncident.outageTime : '', disabled: (this.userRole != "Dispatcher") ? true : false}, Validators.required],
      priority: [{value: this.incidentId ? this.currentIncident.priority : null, disabled: true}],
      estimatedTimetoRestore: [ {value: this.incidentId ? this.currentIncident.estimatedTimetoRestore : null, disabled: (this.userRole != "Dispatcher") ? true : false}],
      isConfirmed: [ {value: this.incidentId ? this.currentIncident.isConfirmed : false, disabled: (this.userRole != "Dispatcher") ? true : false}],
      numberOfCalls: [{value: this.incidentId ? this.currentIncident.numberOfCalls : null, disabled: true}],
      status: [{value: this.incidentId ? this.currentIncident.status : 'Draft', disabled: (this.userRole != "Dispatcher") ? true : false}],
      location: [{value: this.incidentId ? this.currentIncident.location : '', disabled: (this.userRole != "Dispatcher") ? true : false}, Validators.required],
      voltage: [ {value :this.incidentId ? this.currentIncident.voltage : null, disabled: (this.userRole != "Dispatcher") ? true : false}],
      estimatedTimeOfTheCrewArrival: [ {value: this.incidentId ? this.currentIncident.estimatedTimeOfTheCrewArrival : null, disabled: (this.userRole != "Dispatcher") ? true : false}],
      actualTimeOfTheCrewArrival: [{value: this.incidentId ? this.currentIncident.actualTimeOfTheCrewArrival : null, disabled: (this.userRole != "Dispatcher") ? true : false}],
      scheduledTime: [{value: this.incidentId ? this.currentIncident.scheduledTime : null, disabled: (this.userRole != "Dispatcher") ? true : false}],
      latitude: [this.incidentId ? this.currentIncident.latitude : null],
      longitude: [this.incidentId ? this.currentIncident.longitude : null],
      userId: [ this.incidentId ? this.currentIncident.userId : null],
      createdById: [ this.incidentId ? this.currentIncident.createdById : user.username]
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
        console.log(this.basicInfoForm.getRawValue());
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

  delete(){
    this.incidentService.deleteIncident(this.incidentId).subscribe(response => {
      this.router.navigateByUrl('/dashboard/incidents');
      this._snackBar.open("Incident is deleted!", "Succes", {
        duration: 2000,
        horizontalPosition: 'end',
        panelClass: ['mat-toolbar', 'mat-accent']
      } );
    });
  }

  TakeToResolve() {
    var user = JSON.parse(localStorage.getItem('user'));

    this.basicInfoForm.patchValue({
      userId: user.username  
    });

    this.incidentService.updateIncident(this.basicInfoForm.getRawValue()).subscribe(response => {
      console.log(response);
      this._snackBar.open("Incident is taken to resolve by this user!", "Succes", {
        duration: 2000,
        horizontalPosition: 'end',
        panelClass: ['mat-toolbar', 'mat-accent']
      } );

      this.router.navigateByUrl('/dashboard/incidents');
    });
  }

  Cancel() {
    this.router.navigateByUrl('/dashboard/incidents');
  }

}
