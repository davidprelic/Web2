import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}

export interface EquipmentData {
  type: string;
  id: string;
  name: string;
  address: string;
  coordinates: string;
}

const COLORS: string[] = [
  'maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple', 'fuchsia', 'lime', 'teal',
  'aqua', 'blue', 'navy', 'black', 'gray'
];
const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];




@Component({
  selector: 'app-select-device-dialog',
  templateUrl: './select-device-dialog.component.html',
  styleUrls: ['./select-device-dialog.component.css']
})
export class SelectDeviceDialogComponent implements OnInit {
  displayedColumns: string[] = ['type', 'id', 'name', 'address', 'coordinates'];
  dataSource: MatTableDataSource<EquipmentData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dialog: any;
 
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { 
    const users = Array.from({length: 100}, (_, k) => createNewEquipment(k + 1));
  
    this.dataSource = new MatTableDataSource(users);
  }
    
  
  ngOnInit(): void {
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

/** Builds and returns a new User. */
function createNewEquipment(id: number): EquipmentData {
  const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
      NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

  return {
    id: id.toString(),
    name: name,
    coordinates: Math.round(Math.random() * 100).toString(),
    type: COLORS[Math.round(Math.random() * (COLORS.length - 1))],
    address : COLORS[Math.round(Math.random() * (COLORS.length - 1))]
  };
}