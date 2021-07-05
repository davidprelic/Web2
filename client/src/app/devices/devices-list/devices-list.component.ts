import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Device } from 'src/app/_models/device';
import { DeviceService } from 'src/app/_services/device.service';


@Component({
  selector: 'app-devices-list',
  templateUrl: './devices-list.component.html',
  styleUrls: ['./devices-list.component.css']
})
export class DevicesListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'type', 'address','latitude', 'longitude', 'map'];
  dataSource: MatTableDataSource<Device>;
  devices: Device[];
  searchForm: FormGroup;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private deviceService: DeviceService, private fb: FormBuilder, private router: Router) { 
  }

  ngOnInit(): void {
    this.initializeForm();
    this.deviceService.getDevices().subscribe(response => {
      this.dataSource = new MatTableDataSource(response); 
    });
  }

  initializeForm() {
    this.searchForm = this.fb.group({
      type: [''],
      name: [''],
      address: [''],
      latitude: [''],
      longitude: [''],
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applySearch() {

    this.deviceService.getDevicesAfterSearch(this.searchForm.value).subscribe(response => {
      this.dataSource = new MatTableDataSource(response); 
      this.dataSource.data = [...this.dataSource.data];

    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
