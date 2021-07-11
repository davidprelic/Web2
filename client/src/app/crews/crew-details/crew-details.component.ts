import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CrewService } from 'src/app/_services/crew.service';
import { UserService } from 'src/app/_services/user.service';
import { Crew } from 'src/app/_models/crew';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { SelectMembersDialogComponent } from '../select-members-dialog/select-members-dialog.component';
import { CrewMember } from 'src/app/_models/crew-member';
import { ShowMembersDialogComponent } from '../show-members-dialog/show-members-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-crew-details',
  templateUrl: './crew-details.component.html',
  styleUrls: ['./crew-details.component.css']
})
export class CrewDetailsComponent implements OnInit {
  model: any = {};
  crewForm: FormGroup;
  crewId: number;
  currentCrew: Crew;
  updateCrew: Crew;
  dataSource: MatTableDataSource<CrewMember>;
  crewMembers: CrewMember[];
  displayedColumns: string[] = ['id', 'firstName', 'lastName'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  addrInfo = {};

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient, private _snackBar: MatSnackBar,
    private crewService: CrewService, private userService: UserService, private route: ActivatedRoute,
    public dialog: MatDialog, public dialog2: MatDialog) { }

  ngOnInit(): void {
    this.crewId = this.route.snapshot.params['id'];
    this.crewService.getCrewById(this.crewId).subscribe(response => {
      this.currentCrew = response;
      this.updateCrew = response;
      this.initializeForm();
    })
    this.userService.getUsersByCrewId(this.crewId).subscribe(response => {
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.data = [...this.dataSource.data];
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  /*ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }*/

  initializeForm() {
    this.crewForm = this.fb.group({
      name: [this.currentCrew.name, Validators.required]
    })
  }

  edit() {
    this.updateCrew.name = this.crewForm.get('name').value;

    this.crewService.updateCrew(this.updateCrew).subscribe(response => {
      this._snackBar.open("Crew updated!", "Succes", {
        duration: 2000,
        horizontalPosition: 'end',
        panelClass: ['mat-toolbar', 'mat-accent']
      });
      this.router.navigateByUrl('/crews');
    });
  }

  delete() {
    this.crewService.deleteCrew(this.crewId).subscribe(response => {
      this._snackBar.open("Crew deleted!", "Succes", {
        duration: 2000,
        horizontalPosition: 'end',
        panelClass: ['mat-toolbar', 'mat-accent']
      });
      this.router.navigateByUrl('/crews');
    });
  }

  goBack() {
    this.router.navigateByUrl('/crews');
  }

  openDialog() {
    this.dialog.open(SelectMembersDialogComponent, {
      data: {
        crId: this.crewId
      }
    }).afterClosed().subscribe(() => {
      this.userService.getUsersByCrewId(this.crewId).subscribe(response => {
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.data = [...this.dataSource.data];
      });
    });
  }

  openDialog2() {
    this.dialog2.open(ShowMembersDialogComponent, {
      data: {
        crId: this.crewId
      }
    }).afterClosed().subscribe(() => {
      this.userService.getUsersByCrewId(this.crewId).subscribe(response => {
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.data = [...this.dataSource.data];
      });
    });
  }

}
