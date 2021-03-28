import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CrewListDialogComponent } from '../crew-list-dialog/crew-list-dialog.component';

@Component({
  selector: 'app-new-incident-crew',
  templateUrl: './new-incident-crew.component.html',
  styleUrls: ['./new-incident-crew.component.css']
})
export class NewIncidentCrewComponent implements OnInit {

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
