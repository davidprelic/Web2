import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { WorkRequest } from 'src/app/_models/work-request';
import { WorkRequestService } from 'src/app/_services/work-request.service';

@Component({
  selector: 'app-work-request-list',
  templateUrl: './work-request-list.component.html',
  styleUrls: ['./work-request-list.component.css']
})
export class WorkRequestListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'emergencyWork', 'status', 'address', 'incidentId', 'dateTimeCreated'];
  dataSource: MatTableDataSource<WorkRequest>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  filteredNotifications: WorkRequest[];
  tempNotifications: WorkRequest[];
  readNotifications: string = "all";
  typeNotifications: string = "all";

  constructor(private workRequestService: WorkRequestService, private fb: FormBuilder, private router: Router) {

  }

  ngOnInit(): void {
    this.workRequestService.getWorkRequests().subscribe(response => {
      this.filteredNotifications = response;
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.filterNotifications();
    });
  }

  /*ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }*/

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  filterNotifications(){
    var user = JSON.parse(localStorage.getItem('user'));
    this.filteredNotifications = [];
    this.tempNotifications = [];

    if(this.typeNotifications == "all"){
      this.filteredNotifications = this.tempNotifications;
    }
    else if(this.typeNotifications == "mine"){
      this.tempNotifications.forEach(element => {
        if(element.createdBy == user.username){
          this.filteredNotifications.push(element);
        }
      });
    }

  }

}

