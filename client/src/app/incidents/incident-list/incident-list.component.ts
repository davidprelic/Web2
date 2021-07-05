import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Incident } from 'src/app/_models/incident';
import { IncidentService } from 'src/app/_services/incident.service';


@Component({
  selector: 'app-incident-list',
  templateUrl: './incident-list.component.html',
  styleUrls: ['./incident-list.component.css']
})
export class IncidentListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'isConfirmed', 'status', 'location', 'outageTime', 'numberOfCalls'];
  dataSource: MatTableDataSource<Incident>;
  incidents: Incident[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private incidentService: IncidentService, private fb: FormBuilder, private router: Router) {    
   }

  ngOnInit(): void {
    this.incidentService.getIncidents().subscribe(response => {
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

  createNewIncident() {
    // this.incidentService.(this.newDeviceForm.getRawValue()).subscribe(response => {
    //   console.log(response);
    //   this.router.navigateByUrl('/devices');
    // });
  }

}
