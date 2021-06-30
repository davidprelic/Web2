import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConsumerService } from 'src/app/_services/consumer.service';
import { CustomerItem } from 'src/app/_models/customer-item';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-consumers-list',
  templateUrl: './consumers-list.component.html',
  styleUrls: ['./consumers-list.component.css']
})
export class ConsumersListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'lastName', 'type', 'location', 'priority', 'phoneNumber', 'latitude', 'longitude', 'map'];
  dataSource: MatTableDataSource<CustomerItem>;
  consumers : CustomerItem[];
  searchForm: FormGroup;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private consumerService: ConsumerService, private fb: FormBuilder, private router: Router) { 

  }

  ngOnInit(): void {
    this.initializeForm();
    this.consumerService.getConsumers().subscribe(response =>{
      this.dataSource = new MatTableDataSource(response);
    });
  }

  initializeForm() {
    this.searchForm = this.fb.group({
      name: [''],
      lastName: [''],
      type: ['Residental'],
      location: [''],
      priority: [''],
      phoneNumber: [''],
      latitude: [''],
      longitude: [''],
    })
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

  applySearch(){
    this.consumerService.getConsumersAfterSearch(this.searchForm.value).subscribe(response =>{
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.data = [...this.dataSource.data];
    });
  }

}
