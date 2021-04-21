import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface UserData {
  changedBy: string;
  changedFrom: string;
  changedTo: string;
}

const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];

const STATES: string[] = [
  'Cancel', 'Approve', 'Deny' 
];


@Component({
  selector: 'app-work-request-history',
  templateUrl: './work-request-history.component.html',
  styleUrls: ['./work-request-history.component.css']
})
export class WorkRequestHistoryComponent implements OnInit {
  displayedColumns: string[] = ['changedBy', 'changedFrom', 'changedTo'];
  dataSource: MatTableDataSource<UserData>;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() { 
    const users = Array.from({length: 5}, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}

/** Builds and returns a new User. */
function createNewUser(id: number): UserData {
  const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
      NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

  return {
    changedBy: name,
    changedFrom: STATES[Math.round(Math.random() * (STATES.length - 1))],
    changedTo: STATES[Math.round(Math.random() * (STATES.length - 1))],
  };
}