import { state } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


export interface HistoryStates {
  changedBy: string;
  state: string;
}

const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];

const STATES: string[] = [
  'Cancel', 'Approve', 'Deny' 
];

@Component({
  selector: 'app-new-work-plans-history',
  templateUrl: './new-work-plans-history.component.html',
  styleUrls: ['./new-work-plans-history.component.css']
})
export class NewWorkPlansHistoryComponent implements OnInit {
  displayedColumns: string[] = ['changed by', 'status'];
  dataSource: MatTableDataSource<HistoryStates>;
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];

  constructor() {
    const states = Array.from({length: 5}, (_, k) => createStates(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(states);

    
   }

  ngOnInit(): void {
  }

}

function createStates(id: number): HistoryStates {
  const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
      NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

  const stateRand = "Cancel"

  return {   
    changedBy: name,
    state: stateRand,
  };
}
