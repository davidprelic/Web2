import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Crew } from 'src/app/_models/crew';
import { CrewItem } from 'src/app/_models/crew-item';
import { CrewService } from 'src/app/_services/crew.service';
import { IncidentService } from 'src/app/_services/incident.service';
import { CrewListDialogComponent } from '../crew-list-dialog/crew-list-dialog.component';

@Component({
  selector: 'app-incident-crew',
  templateUrl: './incident-crew.component.html',
  styleUrls: ['./incident-crew.component.css']
})
export class IncidentCrewComponent implements OnInit {
  incidentId: number;
  crewInfoForm: FormGroup;
  currentCrew: Crew;
  userRole: string;

  constructor(public dialog: MatDialog, private fb: FormBuilder, private route: ActivatedRoute, private router: Router,
    private incidentService: IncidentService, private crewService: CrewService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    var user = JSON.parse(localStorage.getItem('user'));
    this.userRole = user.userRole;

    this.incidentId = this.route.snapshot.params['id'];

    if (this.incidentId != 0) {
      this.incidentService.getIncidentById(this.incidentId).subscribe(response => {
        if (response.crewId) {
          this.crewService.getCrewById(response.crewId).subscribe(res => {
            this.currentCrew = res;
            console.log(this.currentCrew);
            this.initializeCrewInfoForm();
          })
        }
      });
    }
    else
    {
      this.initializeCrewInfoForm();
    }
  }

  initializeCrewInfoForm() {
    this.crewInfoForm = this.fb.group({
      id: [{ value: this.currentCrew ? this.currentCrew.id : '', disabled: true }, Validators.required],
      name: [{ value: this.currentCrew ? this.currentCrew.name : '', disabled: true }, Validators.required],
      members: [{ value: 'asdf', disabled: true }, Validators.required]
    })
  }

  openDialog() {
    this.dialog.open(CrewListDialogComponent, {
      data: {
        incId: this.incidentId
      }
    }).afterClosed().subscribe(res => {
      if (res.data > 0 && res.data != undefined) {
        this.incidentService.getIncidentById(this.incidentId).subscribe(response => {
          if (response.crewId) {
            this.crewService.getCrewById(response.crewId).subscribe(res => {
              this.currentCrew = res;
              console.log(this.currentCrew);
              this.initializeCrewInfoForm();
              this._snackBar.open("New crew added to incident!", "Succes", {
                duration: 2000,
                horizontalPosition: 'end',
                panelClass: ['mat-toolbar', 'mat-accent']
              });
            })
          }
        });
      }
    });;
  }

  cancel(){
    this.router.navigateByUrl('/dashboard/incidents');
  }

  removeCrew() {
    this.incidentService.getIncidentById(this.incidentId).subscribe(response => {
      response.crewId = null;
      this.incidentService.updateIncident(response).subscribe();
      this.currentCrew = undefined;
      this._snackBar.open("Crew removed from incident!", "Succes", {
        duration: 2000,
        horizontalPosition: 'end',
        panelClass: ['mat-toolbar', 'mat-accent']
      });
    });
  }

}
