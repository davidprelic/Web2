import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddSwitchingInstructionComponent } from '../add-switching-instruction/add-switching-instruction.component';

@Component({
  selector: 'app-new-work-plans-switching-instructions',
  templateUrl: './new-work-plans-switching-instructions.component.html',
  styleUrls: ['./new-work-plans-switching-instructions.component.css']
})
export class NewWorkPlansSwitchingInstructionsComponent implements OnInit {
  constructor(public dialog: MatDialog) { 
    
  }
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  ngOnInit(): void {
  }

  openDialog() {
    this.dialog.open(AddSwitchingInstructionComponent, {
      data: {
        animal: 'panda'
      }
    });
  }

}
