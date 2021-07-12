import { state } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatTab } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { HistoryWorkPlan } from 'src/app/_models/history-work-plan';
import { WorkPlan } from 'src/app/_models/work-plan';
import { AccountService } from 'src/app/_services/account.service';
import { HistoryWorkPlanService } from 'src/app/_services/history-work-plan.service';
import { WorkPlanService } from 'src/app/_services/work-plan.service';

@Component({
  selector: 'app-new-work-plans-history',
  templateUrl: './new-work-plans-history.component.html',
  styleUrls: ['./new-work-plans-history.component.css']
})
export class NewWorkPlansHistoryComponent implements OnInit {
  workPlanId: number;
  displayedColumns: string[] = ['changedBy', 'changedFrom', 'changedTo', 'dateTimeChanged'];
  dataSource: MatTableDataSource<HistoryWorkPlan>;
  historyWorkPlans: HistoryWorkPlan[];
  currentState: string;
  currentWorkPlan: WorkPlan;
  newHistoryWorkPlan: HistoryWorkPlan;
  currentUserId: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  userRole: any;

  constructor(private accountService: AccountService, private historyWorkPlanService: HistoryWorkPlanService, private route: ActivatedRoute, private workPlanService: WorkPlanService) {
    // Assign the data to the data source for the table to render

    
   }

  ngOnInit(): void 
  {
    var user = JSON.parse(localStorage.getItem('user'));
    this.userRole = user.userRole;

    var user = JSON.parse(localStorage.getItem('user'));
    this.accountService.getAccount(user.username).subscribe(response => {
      this.currentUserId = response.id;
    })

    this.workPlanId = parseInt(this.route.snapshot.params['id']);

    if(this.workPlanId != 0){
      this.workPlanService.getWorkPlanById(this.workPlanId).subscribe(response =>{
        this.currentWorkPlan = response;
        this.currentState = response.status;
      });

      this.historyWorkPlanService.getHistoryWorkPlansByWorkPlanId(this.workPlanId).subscribe(response =>{
        this.dataSource = new MatTableDataSource(response);
      })
    }
  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  Approve(){
    this.newHistoryWorkPlan = {
      changedFrom: this.currentState,
      changedTo: "Approved",
      dateTimeChanged: new Date(),
      userId: this.currentUserId,
      workPlanId: this.workPlanId
    }

    this.historyWorkPlanService.addNewHistoryWorkPlan(this.newHistoryWorkPlan).subscribe(response => {
      this.currentWorkPlan.status = "Approved";
      this.workPlanService.updateWorkPlan(this.currentWorkPlan).subscribe(() => {
        this.workPlanService.getWorkPlanById(this.workPlanId).subscribe(response => {
          this.currentWorkPlan = response;
          this.currentState = response.status;
        })

        this.historyWorkPlanService.getHistoryWorkPlansByWorkPlanId(this.workPlanId).subscribe(response=>{
          this.dataSource = new MatTableDataSource(response);
          this.dataSource.data = [...this.dataSource.data];
          //dodaj toastr
      });  
      
      });

    });
  }

  Issue() {
    this.newHistoryWorkPlan = {
      changedFrom: this.currentState,
      changedTo: "Issued",
      dateTimeChanged: new Date(),
      userId: this.currentUserId,
      workPlanId: this.workPlanId
    }

    this.historyWorkPlanService.addNewHistoryWorkPlan(this.newHistoryWorkPlan).subscribe(response => {
      this.currentWorkPlan.status = "Issued";
      this.workPlanService.updateWorkPlan(this.currentWorkPlan).subscribe(() => {
        this.workPlanService.getWorkPlanById(this.workPlanId).subscribe(response => {
          this.currentWorkPlan = response;
          this.currentState = response.status;
        })

        this.historyWorkPlanService.getHistoryWorkPlansByWorkPlanId(this.workPlanId).subscribe(response=>{
          this.dataSource = new MatTableDataSource(response);
          this.dataSource.data = [...this.dataSource.data];
          //dodaj toastr
      });  
      
      });

    });
  }

  Deny() {
    this.newHistoryWorkPlan = {
      changedFrom: this.currentState,
      changedTo: "Denied",
      dateTimeChanged: new Date(),
      userId: this.currentUserId,
      workPlanId: this.workPlanId
    }

    this.historyWorkPlanService.addNewHistoryWorkPlan(this.newHistoryWorkPlan).subscribe(response => {
      this.currentWorkPlan.status = "Denied";
      this.workPlanService.updateWorkPlan(this.currentWorkPlan).subscribe(() => {
        this.workPlanService.getWorkPlanById(this.workPlanId).subscribe(response => {
          this.currentWorkPlan = response;
          this.currentState = response.status;
        })

        this.historyWorkPlanService.getHistoryWorkPlansByWorkPlanId(this.workPlanId).subscribe(response=>{
          this.dataSource = new MatTableDataSource(response);
          this.dataSource.data = [...this.dataSource.data];
          //dodaj toastr
      });  
      
      });

    });
  }

}