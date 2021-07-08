import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { HistorySafetyDoc } from 'src/app/_models/history-safety-doc';
import { SafetyDocument } from 'src/app/_models/safety-document';
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
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private historySafetyDocService: HistorySafetyDocService, private route: ActivatedRoute,
              private safetyDocService: SafetyDocService) { 
  }

  ngOnInit(): void {
    this.safetyDocId = parseInt(this.route.snapshot.params['id']);

    this.safetyDocService.getSafetyDocById(this.safetyDocId).subscribe(response => {
      this.currentSafetyDoc = response;
      this.currentState = response.status;
    })

    this.historySafetyDocService.getHistorySafetyDocsBySafetyDocId(this.safetyDocId).subscribe(response => {
      this.dataSource = new MatTableDataSource(response); 
    });
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
      userId: 4,
      safetyDocumentId: this.safetyDocId
    }

    this.historySafetyDocService.addNewHistorySafetyDoc(this.newHistorySafetyDoc).subscribe(response => {
      this.currentSafetyDoc.status = "Approved";
      this.safetyDocService.updateSafetyDoc(this.currentSafetyDoc).subscribe();
    });
  }

  Issue() {
    this.newHistorySafetyDoc = {
      changedFrom: this.currentState,
      changedTo: "Issued",
      dateTimeChanged: new Date(),
      userId: 4,
      safetyDocumentId: this.safetyDocId
    }

    this.historySafetyDocService.addNewHistorySafetyDoc(this.newHistorySafetyDoc).subscribe(response => {
      this.currentSafetyDoc.status = "Issued";
      this.safetyDocService.updateSafetyDoc(this.currentSafetyDoc).subscribe();
    });
  }

  Deny() {
    this.newHistorySafetyDoc = {
      changedFrom: this.currentState,
      changedTo: "Denied",
      dateTimeChanged: new Date(),
      userId: 4,
      safetyDocumentId: this.safetyDocId
    }

    this.historySafetyDocService.addNewHistorySafetyDoc(this.newHistorySafetyDoc).subscribe(response => {
      this.currentSafetyDoc.status = "Denied";
      this.safetyDocService.updateSafetyDoc(this.currentSafetyDoc).subscribe();
    });
  }

}
