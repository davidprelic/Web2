import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CrewListDialogComponent } from '../crew-list-dialog/crew-list-dialog.component';

@Component({
  selector: 'app-incident-crew',
  templateUrl: './incident-crew.component.html',
  styleUrls: ['./incident-crew.component.css']
})
export class IncidentCrewComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog() {
    this.dialog.open(CrewListDialogComponent, {
      data: {
        animal: 'panda'
      }
    });
  }

}
