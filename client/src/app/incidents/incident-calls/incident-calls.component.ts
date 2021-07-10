import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Call } from 'src/app/_models/call';
import { CallService } from 'src/app/_services/call.service';
import { AddCallDialogComponent } from '../add-call-dialog/add-call-dialog.component';


@Component({
  selector: 'app-incident-calls',
  templateUrl: './incident-calls.component.html',
  styleUrls: ['./incident-calls.component.css']
})
export class IncidentCallsComponent implements OnInit {
  incidentId: number;
  displayedColumns: string[] = ['id', 'reason', 'hazard', 'comment', 'map'];
  dataSource: MatTableDataSource<Call>;
  calls: Call[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(public dialog: MatDialog, private route: ActivatedRoute, 
              private callService: CallService, private _snackBar: MatSnackBar) { 
  }

  ngOnInit(): void {
    this.incidentId = this.route.snapshot.params['id'];
    this.callService.getCallsByIncidentId(this.incidentId).subscribe(response => {
      this.dataSource = new MatTableDataSource(response); 
    });
  }

  ngAfterViewInit() {
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

  openDialog() {
    this.dialog.open(AddCallDialogComponent, {
      data: {
        incId: this.incidentId
      }
    }).afterClosed().subscribe(res => {
      if (res.data > 0 && res.data != undefined)
      {
        this.callService.getCallsByIncidentId(this.incidentId).subscribe(response => {
          this.dataSource = new MatTableDataSource(response); 
          this.dataSource.data = [...this.dataSource.data];
          this._snackBar.open("New call added to incident!", "Succes", {
            duration: 2000,
            horizontalPosition: 'end',
            panelClass: ['mat-toolbar', 'mat-accent']
          } );
        }); 
      }
    });
  }
  

}
