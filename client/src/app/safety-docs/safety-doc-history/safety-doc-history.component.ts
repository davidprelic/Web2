import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { HistorySafetyDoc } from 'src/app/_models/history-safety-doc';
import { SafetyDocument } from 'src/app/_models/safety-document';
import { AccountService } from 'src/app/_services/account.service';
import { HistorySafetyDocService } from 'src/app/_services/history-safety-doc.service';
import { SafetyDocService } from 'src/app/_services/safety-doc.service';


@Component({
  selector: 'app-safety-doc-history',
  templateUrl: './safety-doc-history.component.html',
  styleUrls: ['./safety-doc-history.component.css']
})
export class SafetyDocHistoryComponent implements OnInit {
  safetyDocId: number;
  displayedColumns: string[] = ['changedBy', 'changedFrom', 'changedTo', 'dateTimeChanged'];
  dataSource: MatTableDataSource<HistorySafetyDoc>;
  historySafetyDocs: HistorySafetyDoc[];
  currentState: string;
  currentSafetyDoc: SafetyDocument;
  newHistorySafetyDoc: HistorySafetyDoc;
  currentUserId: number;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private historySafetyDocService: HistorySafetyDocService, private route: ActivatedRoute,
              private safetyDocService: SafetyDocService, private _snackBar: MatSnackBar, private accountService: AccountService) { 
  }

  ngOnInit(): void {
    this.safetyDocId = parseInt(this.route.snapshot.params['id']);
    var user = JSON.parse(localStorage.getItem('user'));

    this.accountService.getAccount(user.username).subscribe(response => {
      this.currentUserId = response.id;
    })

    if (this.safetyDocId != 0)
    {
      this.safetyDocService.getSafetyDocById(this.safetyDocId).subscribe(response => {
        this.currentSafetyDoc = response;
        this.currentState = response.status;
      })

      this.historySafetyDocService.getHistorySafetyDocsBySafetyDocId(this.safetyDocId).subscribe(response => {
        this.dataSource = new MatTableDataSource(response); 
        this.dataSource.paginator = this.paginator;
      });
    }
  
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  Approve() {
    this.newHistorySafetyDoc = {
      changedFrom: this.currentState,
      changedTo: "Approved",
      dateTimeChanged: new Date(),
      userId: this.currentUserId,
      safetyDocumentId: this.safetyDocId
    }

    this.historySafetyDocService.addNewHistorySafetyDoc(this.newHistorySafetyDoc).subscribe(response => {
      this.currentSafetyDoc.status = "Approved";
      this.safetyDocService.updateSafetyDoc(this.currentSafetyDoc).subscribe(() => {
        this.safetyDocService.getSafetyDocById(this.safetyDocId).subscribe(response => {
          this.currentSafetyDoc = response;
          this.currentState = response.status;
        })
    
        this.historySafetyDocService.getHistorySafetyDocsBySafetyDocId(this.safetyDocId).subscribe(response => {
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
    this.newHistorySafetyDoc = {
      changedFrom: this.currentState,
      changedTo: "Issued",
      dateTimeChanged: new Date(),
      userId: this.currentUserId,
      safetyDocumentId: this.safetyDocId
    }

    this.historySafetyDocService.addNewHistorySafetyDoc(this.newHistorySafetyDoc).subscribe(response => {
      this.currentSafetyDoc.status = "Issued";
      this.safetyDocService.updateSafetyDoc(this.currentSafetyDoc).subscribe(() => {
        this.safetyDocService.getSafetyDocById(this.safetyDocId).subscribe(response => {
          this.currentSafetyDoc = response;
          this.currentState = response.status;
        })
    
        this.historySafetyDocService.getHistorySafetyDocsBySafetyDocId(this.safetyDocId).subscribe(response => {
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
    this.newHistorySafetyDoc = {
      changedFrom: this.currentState,
      changedTo: "Denied",
      dateTimeChanged: new Date(),
      userId: this.currentUserId,
      safetyDocumentId: this.safetyDocId
    }

    this.historySafetyDocService.addNewHistorySafetyDoc(this.newHistorySafetyDoc).subscribe(response => {
      this.currentSafetyDoc.status = "Denied";
      this.safetyDocService.updateSafetyDoc(this.currentSafetyDoc).subscribe(() => {
        this.safetyDocService.getSafetyDocById(this.safetyDocId).subscribe(response => {
          this.currentSafetyDoc = response;
          this.currentState = response.status;
        })
    
        this.historySafetyDocService.getHistorySafetyDocsBySafetyDocId(this.safetyDocId).subscribe(response => {
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
