import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DeviceItem } from 'src/app/_models/device-item';
import { DeviceService } from 'src/app/_services/device.service';


@Component({
  selector: 'app-devices-list',
  templateUrl: './devices-list.component.html',
  styleUrls: ['./devices-list.component.css']
})
export class DevicesListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'type', 'address','latitude', 'longitude', 'map'];
  dataSource: MatTableDataSource<DeviceItem>;
  devices: DeviceItem[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private deviceService: DeviceService) { 
  }

  ngOnInit(): void {
    this.deviceService.getDevices().subscribe(response => {
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

}
