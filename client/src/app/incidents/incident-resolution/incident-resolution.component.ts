import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Resolution } from 'src/app/_models/resolution';
import { IncidentService } from 'src/app/_services/incident.service';
import { ResolutionService } from 'src/app/_services/resolution.service';

@Component({
  selector: 'app-incident-resolution',
  templateUrl: './incident-resolution.component.html',
  styleUrls: ['./incident-resolution.component.css']
})
export class IncidentResolutionComponent implements OnInit {
  resolutionForm: FormGroup;
  incidentId: number;
  currentResolutionId: number;
  currentResolution: Resolution;
  resolutionForUpdate: Resolution;
  userRole: string;

  constructor(private fb: FormBuilder, private resolutionService: ResolutionService, private router: Router,
              private incidentService: IncidentService, private route: ActivatedRoute, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    var user = JSON.parse(localStorage.getItem('user'));
    this.userRole = user.userRole;

    this.incidentId = parseInt(this.route.snapshot.params['id']);

    if (this.incidentId != 0)
    {
      this.incidentService.getIncidentById(this.incidentId).subscribe(response => {
          this.currentResolutionId = response.resolutionId;
          this.resolutionService.getResolutionById(response.resolutionId).subscribe(response => {
            this.currentResolution = response;
            this.initializeForm();
          });
      });
    }
    else 
    {
      this.initializeForm();
    }
  }

  initializeForm() {
    this.resolutionForm = this.fb.group({
      cause: [ { value: this.incidentId ? this.currentResolution.cause : null, disabled: (this.userRole != "Dispatcher") ? true : false}, Validators.required],
      subcause: [{value: this.incidentId ? this.currentResolution.subcause : null, disabled: (this.userRole != "Dispatcher") ? true : false }, Validators.required],
      constructionType: [ {value:this.incidentId ? this.currentResolution.constructionType : null, disabled: (this.userRole != "Dispatcher") ? true : false}, Validators.required],
      material: [ {value: this.incidentId ? this.currentResolution.material : null, disabled: (this.userRole != "Dispatcher") ? true : false}, Validators.required]
    })
  }

  cancel(){
    this.router.navigateByUrl('/dashboard/incidents');
  }

  updateResolution() {
    this.resolutionForUpdate = 
    {
      id: this.currentResolutionId,
      cause: this.resolutionForm.get('cause').value,
      subcause: this.resolutionForm.get('subcause').value,
      constructionType: this.resolutionForm.get('constructionType').value,
      material: this.resolutionForm.get('material').value
    }

    console.log(this.resolutionForUpdate);

    this.resolutionService.updateResolution(this.resolutionForUpdate).subscribe(response => {
      this._snackBar.open("Resolution changes saved!", "Succes", {
        duration: 2000,
        horizontalPosition: 'end',
        panelClass: ['mat-toolbar', 'mat-accent']
      } );
    });
  }

}
