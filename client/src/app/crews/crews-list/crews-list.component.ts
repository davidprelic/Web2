import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CrewService } from 'src/app/_services/crew.service';
import { CrewItem } from 'src/app/_models/crew-item';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-crews-list',
  templateUrl: './crews-list.component.html',
  styleUrls: ['./crews-list.component.css']
})
export class CrewsListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name'];
  dataSource: MatTableDataSource<CrewItem>;
  crews : CrewItem[];
  searchForm: FormGroup;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private crewService: CrewService, private fb: FormBuilder, private router: Router) { 
    
  }

  ngOnInit(): void {
    this.initializeForm();
    this.crewService.getCrews().subscribe(response =>{
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    });
  }

  initializeForm() {
    this.searchForm = this.fb.group({
      name: [''],
    })
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

  applySearch(){
    this.crewService.getCrewAfterSearch(this.searchForm.value).subscribe(response =>{
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.data = [...this.dataSource.data];
    });
  }

}
