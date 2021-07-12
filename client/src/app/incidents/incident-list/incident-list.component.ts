import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Incident } from 'src/app/_models/incident';
import { User } from 'src/app/_models/user';
import { IncidentService } from 'src/app/_services/incident.service';


@Component({
  selector: 'app-incident-list',
  templateUrl: './incident-list.component.html',
  styleUrls: ['./incident-list.component.css']
})
export class IncidentListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'isConfirmed', 'status', 'location', 'outageTime', 'numberOfCalls', 
      'affectedCustomers', 'voltage'];
  dataSource: MatTableDataSource<Incident>;
  incidents: Incident[];
  selectedIncidentFilter: string = "all";
  userRole: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private incidentService: IncidentService, private fb: FormBuilder, private router: Router) {    
   }

  ngOnInit(): void {
    var user = JSON.parse(localStorage.getItem('user'));
    this.userRole = user.userRole;

    this.incidentService.getIncidents().subscribe(response => {
      this.dataSource = new MatTableDataSource(response); 
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  filterIncidents() {
    if (this.selectedIncidentFilter == "all")
    {
      console.log('ALL');
      this.incidentService.getIncidents().subscribe(response => {
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.data = [...this.dataSource.data]; 
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    }
    else if (this.selectedIncidentFilter == "mine")
    {
      console.log('MINE');
      var user = JSON.parse(localStorage.getItem('user'));
      this.incidentService.getIncidentsByUsername(user.username).subscribe(response => {
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.data = [...this.dataSource.data]; 
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    }
  }

  createNewIncident() {
    // this.incidentService.(this.newDeviceForm.getRawValue()).subscribe(response => {
    //   console.log(response);
    //   this.router.navigateByUrl('/devices');
    // });
  }

}
