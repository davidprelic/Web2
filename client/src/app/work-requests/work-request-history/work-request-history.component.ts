import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { HistoryWorkRequest } from 'src/app/_models/history-work-request';
import { WorkRequest } from 'src/app/_models/work-request';
import { AccountService } from 'src/app/_services/account.service';
import { HistoryWorkRequestService } from 'src/app/_services/history-work-request.service';
import { WorkRequestService } from 'src/app/_services/work-request.service';


@Component({
  selector: 'app-work-request-history',
  templateUrl: './work-request-history.component.html',
  styleUrls: ['./work-request-history.component.css']
})
export class WorkRequestHistoryComponent implements OnInit {
  workRequestId: number;
  displayedColumns: string[] = ['changedBy', 'changedFrom', 'changedTo', 'dateTimeChanged'];
  dataSource: MatTableDataSource<HistoryWorkRequest>;
  historyWorkRequest: HistoryWorkRequest[];
  currentState: string;
  currentWorkRequest: WorkRequest;
  newHistoryWorkRequest: HistoryWorkRequest;
  currentUserId: number;
  userRole: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private historyWorkRequestService: HistoryWorkRequestService, private route: ActivatedRoute,
    private workRequestService: WorkRequestService, private _snackBar: MatSnackBar, private accountService: AccountService) {
  }

  ngOnInit(): void {
    this.workRequestId = parseInt(this.route.snapshot.params['id']);
    var user = JSON.parse(localStorage.getItem('user'));
    this.userRole = user.userRole;

    this.accountService.getAccount(user.username).subscribe(response => {
      this.currentUserId = response.id;
    })


    if (this.workRequestId != 0) {
      this.workRequestService.getWorkRequestById(this.workRequestId).subscribe(response => {
        this.currentWorkRequest = response;
        this.currentState = response.status;
      })

      this.historyWorkRequestService.getHistoryWorkRequestByWorkRequestId(this.workRequestId).subscribe(response => {
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    }

  }

  /*ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }*/

  Approve() {
    this.newHistoryWorkRequest = {
      changedFrom: this.currentState,
      changedTo: "Approved",
      dateTimeChanged: new Date(),
      userId: this.currentUserId,
      workRequestId: this.workRequestId
    }

    this.historyWorkRequestService.addNewHistoryWorkRequest(this.newHistoryWorkRequest).subscribe(response => {
      this.currentWorkRequest.status = "Approved";
      this.workRequestService.updateWorkRequest(this.currentWorkRequest).subscribe(() => {
        this.workRequestService.getWorkRequestById(this.workRequestId).subscribe(response => {
          this.currentWorkRequest = response;
          this.currentState = response.status;
        })

        this.historyWorkRequestService.getHistoryWorkRequestByWorkRequestId(this.workRequestId).subscribe(response => {
          this.dataSource = new MatTableDataSource(response);
          this.dataSource.data = [...this.dataSource.data];
          this._snackBar.open("State changed to Approved!", "Succes", {
            duration: 2000,
            horizontalPosition: 'end',
            panelClass: ['mat-toolbar', 'mat-accent']
          });
        });
      });
    });
  }

  Issue() {
    this.newHistoryWorkRequest = {
      changedFrom: this.currentState,
      changedTo: "Issued",
      dateTimeChanged: new Date(),
      userId: this.currentUserId,
      workRequestId: this.workRequestId
    }

    this.historyWorkRequestService.addNewHistoryWorkRequest(this.newHistoryWorkRequest).subscribe(response => {
      this.currentWorkRequest.status = "Issued";
      this.workRequestService.updateWorkRequest(this.currentWorkRequest).subscribe(() => {
        this.workRequestService.getWorkRequestById(this.workRequestId).subscribe(response => {
          this.currentWorkRequest = response;
          this.currentState = response.status;
        })

        this.historyWorkRequestService.getHistoryWorkRequestByWorkRequestId(this.workRequestId).subscribe(response => {
          this.dataSource = new MatTableDataSource(response);
          this.dataSource.data = [...this.dataSource.data];
          this._snackBar.open("State changed to Issued!", "Succes", {
            duration: 2000,
            horizontalPosition: 'end',
            panelClass: ['mat-toolbar', 'mat-accent']
          });
        });
      });
    });
  }

  Deny() {
    this.newHistoryWorkRequest = {
      changedFrom: this.currentState,
      changedTo: "Denied",
      dateTimeChanged: new Date(),
      userId: this.currentUserId,
      workRequestId: this.workRequestId
    }

    this.historyWorkRequestService.addNewHistoryWorkRequest(this.newHistoryWorkRequest).subscribe(response => {
      this.currentWorkRequest.status = "Denied";
      this.workRequestService.updateWorkRequest(this.currentWorkRequest).subscribe(() => {
        this.workRequestService.getWorkRequestById(this.workRequestId).subscribe(response => {
          this.currentWorkRequest = response;
          this.currentState = response.status;
        })

        this.historyWorkRequestService.getHistoryWorkRequestByWorkRequestId(this.workRequestId).subscribe(response => {
          this.dataSource = new MatTableDataSource(response);
          this.dataSource.data = [...this.dataSource.data];
          this._snackBar.open("State changed to Denied!", "Succes", {
            duration: 2000,
            horizontalPosition: 'end',
            panelClass: ['mat-toolbar', 'mat-accent']
          });
        });
      });
    });
  }

}