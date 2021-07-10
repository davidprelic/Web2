import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { CrewItem } from 'src/app/_models/crew-item';
import { CrewService } from 'src/app/_services/crew.service';
import { IncidentService } from 'src/app/_services/incident.service';


@Component({
  selector: 'app-crew-list-dialog',
  templateUrl: './crew-list-dialog.component.html',
  styleUrls: ['./crew-list-dialog.component.css']
})
export class CrewListDialogComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'crewMembers'];
  dataSource: MatTableDataSource<CrewItem>;
  crews: CrewItem[];
  selectedCrewId: number;
  addButtonToggle: boolean;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(@Inject(MAT_DIALOG_DATA) public data: {incId: number}, private crewService: CrewService, 
              private incidentService: IncidentService, private dialogRef: MatDialogRef<CrewListDialogComponent>) { 
                this.addButtonToggle = true;
  }

  ngOnInit(): void {
    this.crewService.getCrews().subscribe(response => {
      this.dataSource = new MatTableDataSource(response); 
    });
  }

  ngAfterViewInit() {CrewListDialogComponent
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getSelectedCrewId(id: number) {
    this.selectedCrewId = id;
    this.addButtonToggle = false;
  }

  AddCrewToIncident() {
    this.incidentService.getIncidentById(this.data.incId).subscribe(response => {
      response.crewId = this.selectedCrewId;
      this.incidentService.updateIncident(response).subscribe(() => {
        this.dialogRef.close({ data: 1 });
      });
    });
  }

  cancel() {
    // closing itself and sending data to parent component
    this.dialogRef.close({ data: 0 });
  }

}

