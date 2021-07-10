import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SafetyDocument } from 'src/app/_models/safety-document';
import { SafetyDocService } from 'src/app/_services/safety-doc.service';

@Component({
  selector: 'app-safety-docs-list',
  templateUrl: './safety-docs-list.component.html',
  styleUrls: ['./safety-docs-list.component.css']
})
export class SafetyDocsListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'startDate', 'phoneNumber', 'status'];
  dataSource: MatTableDataSource<SafetyDocument>;
  safetyDocs: SafetyDocument[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private safetyDocService: SafetyDocService, private fb: FormBuilder, private router: Router) { 
  }

  ngOnInit(): void {
    this.safetyDocService.getSafetyDocs().subscribe(response => {
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
