import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { WorkPlan } from 'src/app/_models/work-plan';
import { WorkPlanService } from 'src/app/_services/work-plan.service';

@Component({
  selector: 'app-work-plans-list',
  templateUrl: './work-plans-list.component.html',
  styleUrls: ['./work-plans-list.component.css']
})
export class WorkPlansListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'status', 'address', 'workRequestId', 'incidentId', 'dateTimeCreated'];
  dataSource: MatTableDataSource<WorkPlan>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private workPlanService: WorkPlanService, private fb: FormBuilder, private router: Router) {
    
   }

  ngOnInit(): void {
    this.workPlanService.getWorkPlans().subscribe(response => {
      this.dataSource = new MatTableDataSource(response);
    })
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

