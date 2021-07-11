import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CrewMember } from 'src/app/_models/crew-member';
import { UserService } from 'src/app/_services/user.service';
import { Router } from '@angular/router';
import { CrewChangeUser } from 'src/app/_models/crew-change-user';
import { MatSnackBar } from '@angular/material/snack-bar';




@Component({
  selector: 'app-show-members-dialog',
  templateUrl: './show-members-dialog.component.html',
  styleUrls: ['./show-members-dialog.component.css']
})
export class ShowMembersDialogComponent implements OnInit {
  displayedColumns: string[] = ['id', 'firstName', 'lastName'];
  dataSource: MatTableDataSource<CrewMember>;
  crewMembers: CrewMember[];
  selectedCrewMemberId: number;
  deleteButtonToggle: boolean;
  selectedCrewMember: CrewChangeUser;
  crewIdd: number | null;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(@Inject(MAT_DIALOG_DATA) public data: { crId: number }, private userService: UserService, private router: Router,
    private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.userService.getUsersByCrewId(this.data.crId).subscribe(response => {
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    this.deleteButtonToggle = true;
    this.crewIdd = null
  }

  /*ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }*/

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getSelectedCrewMemberId(id: number) {
    this.selectedCrewMemberId = id;
    this.deleteButtonToggle = false;
  }

  DeleteCrewMember() {
    this.userService.getUserById(this.selectedCrewMemberId).subscribe(response => {
      this._snackBar.open("Crew member removed from crew!", "Succes", {
        duration: 2000,
        horizontalPosition: 'end',
        panelClass: ['mat-toolbar', 'mat-accent']
      });
      this.selectedCrewMember = {
        id: this.selectedCrewMemberId,
        crewId: this.data.crId
      }

      this.userService.updateCrewMember(this.selectedCrewMember).subscribe();
    });

  }

}