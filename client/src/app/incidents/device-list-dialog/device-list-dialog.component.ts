import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Device } from 'src/app/_models/device';
import { DeviceService } from 'src/app/_services/device.service';


@Component({
  selector: 'app-device-list-dialog',
  templateUrl: './device-list-dialog.component.html',
  styleUrls: ['./device-list-dialog.component.css']
})
export class DeviceListDialogComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'type', 'address'];
  dataSource: MatTableDataSource<Device>;
  devices: Device[];
  selectedDeviceId: number;
  addButtonToggle: boolean;
  selectedDevice: Device;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {incId: number}, private deviceService: DeviceService,
              private router: Router) { 
    this.addButtonToggle = true;
  }

  ngOnInit(): void {
    this.deviceService.getFreeDevices().subscribe(response => {
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

  getSelectedDeviceId(id: number) {
    this.selectedDeviceId = id;
    this.addButtonToggle = false;
  }

  AddDevice() {
    this.deviceService.getDeviceById(this.selectedDeviceId).subscribe(response => {
      this.selectedDevice = {
        id: this.selectedDeviceId,
        type: response.type,
        name: response.name,
        address: response.address,
        latitude: response.latitude.toString(),
        longitude: response.longitude.toString(),
        incidentId: this.data.incId
      }
       
      this.deviceService.updateDevice(this.selectedDevice).subscribe();
    });

    

  }

}

