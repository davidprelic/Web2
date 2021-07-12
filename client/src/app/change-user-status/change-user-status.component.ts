import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/_services/account.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UserChangeState } from '../_models/user-change-state';

@Component({
  selector: 'app-change-user-status',
  templateUrl: './change-user-status.component.html',
  styleUrls: ['./change-user-status.component.css']
})
export class ChangeUserStatusComponent implements OnInit {

  displayedColumns: string[] = ['id', 'userName', 'status'];
  dataSource: MatTableDataSource<UserChangeState>;
  users: UserChangeState[];
  searchForm: FormGroup;
  currentId: number;
  currentStatus: string;
  korisnik: UserChangeState = { id: 0, username: "asdf", registrationStatus: "" };

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private accountService: AccountService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.accountService.getAllUsers().subscribe(response => {
      this.users = response;
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ChangeStatus(id: number, status: string) {
    this.korisnik.id = id;
    this.korisnik.registrationStatus = status;
    this.accountService.changeAccountStatus(this.korisnik).subscribe();
  }

}
