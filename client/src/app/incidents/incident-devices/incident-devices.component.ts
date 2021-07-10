import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Device } from 'src/app/_models/device';
import { DeviceService } from 'src/app/_services/device.service';
import { DeviceListDialogComponent } from '../device-list-dialog/device-list-dialog.component';


@Component({
  selector: 'app-incident-devices',
  templateUrl: './incident-devices.component.html',
  styleUrls: ['./incident-devices.component.css']
})
export class IncidentDevicesComponent implements OnInit {
  incidentId: number;
  displayedColumns: string[] = ['id', 'name', 'type', 'address','latitude', 'longitude', 'map'];
  dataSource: MatTableDataSource<Device>;
  devices: Device[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog, private deviceService: DeviceService,
              private route: ActivatedRoute, private _snackBar: MatSnackBar) { 
  }

  ngOnInit(): void {
    this.incidentId = this.route.snapshot.params['id'];
    this.deviceService.getDevicesByIncidentId(this.incidentId).subscribe(response => {
      this.dataSource = new MatTableDataSource(response); 
      this.dataSource.paginator = this.paginator;
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
    this.dialog.open(DeviceListDialogComponent, {
      data: {
        incId: this.incidentId
      }
    }).afterClosed().subscribe(res => {
      if (res.data > 0 && res.data != undefined)
      {
        this.deviceService.getDevicesByIncidentId(this.incidentId).subscribe(response => {
          this.dataSource = new MatTableDataSource(response); 
          this.dataSource.data = [...this.dataSource.data];
          this._snackBar.open("New device added to incident!", "Succes", {
            duration: 2000,
            horizontalPosition: 'end',
            panelClass: ['mat-toolbar', 'mat-accent']
          } );
        }); 
      }
    });
  }

}
